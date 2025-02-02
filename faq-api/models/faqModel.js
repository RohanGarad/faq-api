const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    question_hi: String,
    question_bn: String,
  },
});

faqSchema.methods.getTranslatedQuestion = function (lang) {
  return this.translations[`question_${lang}`] || this.question;
};

module.exports = mongoose.model("FAQ", faqSchema);
