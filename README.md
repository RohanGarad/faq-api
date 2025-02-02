1. Installation Steps:

git clone <repo_url>
cd faq_project
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver



2. API Usage Examples:

Fetch FAQs in English: curl http://localhost:8000/api/faqs/
Fetch FAQs in Hindi: curl http://localhost:8000/api/faqs/?lang=hi
Fetch FAQs in Bengali: curl http://localhost:8000/api/faqs/?lang=bn