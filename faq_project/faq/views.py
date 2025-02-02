from rest_framework.views import APIView
from rest_framework.response import Response
from .models import FAQ
from .serializers import FAQSerializer

from django.core.cache import cache

class FAQListView(APIView):
    def get(self, request):
        lang = request.GET.get('lang', 'en')
        cache_key = f'faqs_{lang}'
        faqs = cache.get(cache_key)
        
        if not faqs:
            faqs = FAQ.objects.all()
            serializer = FAQSerializer(faqs, many=True, context={'lang': lang})
            faqs = serializer.data
            cache.set(cache_key, faqs, timeout=60 * 15)  # Cache for 15 minutes

        return Response(faqs)
