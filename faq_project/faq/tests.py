import pytest
from rest_framework.test import APIClient
from .models import FAQ

@pytest.mark.django_db
def test_faq_api():
    client = APIClient()
    
    # Create some FAQs
    faq = FAQ.objects.create(
        question="What is Django?",
        answer="Django is a web framework.",
    )

    # Test fetching FAQs in English
    response = client.get('/api/faqs/?lang=en')
    assert response.status_code == 200
    assert response.data[0]['question'] == "What is Django?"

    # Test fetching FAQs in Hindi
    response = client.get('/api/faqs/?lang=hi')
    assert response.status_code == 200
    assert 'question_hi' in response.data[0]
