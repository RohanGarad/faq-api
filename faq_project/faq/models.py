from django.db import models
from ckeditor.fields import RichTextField

class FAQ(models.Model):
    question = models.TextField()
    answer = RichTextField()
    question_hi = models.TextField(null=True, blank=True)
    question_bn = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.question

    def get_translated_question(self, language):
        translations = {
            'hi': self.question_hi,
            'bn': self.question_bn,
        }
        return translations.get(language, self.question)

    def save(self, *args, **kwargs):
        # Translate the question if not already set
        if not self.question_hi or not self.question_bn:
            from googletrans import Translator
            translator = Translator()
            if not self.question_hi:
                self.question_hi = translator.translate(self.question, src='en', dest='hi').text
            if not self.question_bn:
                self.question_bn = translator.translate(self.question, src='en', dest='bn').text
        super().save(*args, **kwargs)
