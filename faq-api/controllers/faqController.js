const FAQ = require("../models/faqModel");
const redis = require("../config/cache");
const translate = require("google-translate-api");

const getFAQs = async (req, res) => {
  try {
    const lang = req.query.lang || "en";
    const cacheKey = `faqs_${lang}`;

    // Check if FAQs are cached
    const cachedFAQs = await redis.get(cacheKey);
    if (cachedFAQs) {
      return res.json(JSON.parse(cachedFAQs));
    }

    const faqs = await FAQ.find();
    const translatedFAQs = faqs.map((faq) => ({
      question: faq.getTranslatedQuestion(lang),
      answer: faq.answer,
    }));

    // Store FAQs in cache
    await redis.set(cacheKey, JSON.stringify(translatedFAQs), "EX", 3600);

    res.json(translatedFAQs);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const createFAQ = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const translatedText = await translate(question, { to: "hi" });
    const translatedBn = await translate(question, { to: "bn" });

    const faq = new FAQ({
      question,
      answer,
      translations: {
        question_hi: translatedText.text,
        question_bn: translatedBn.text,
      },
    });

    await faq.save();
    res.status(201).json(faq);
  } catch (err) {
    res.status(500).json({ message: "Error creating FAQ" });
  }
};

module.exports = { getFAQs, createFAQ };
