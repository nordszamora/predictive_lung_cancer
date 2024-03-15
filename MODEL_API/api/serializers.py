from rest_framework import serializers

class ModelFormSerializer(serializers.Serializer):
   smoking = serializers.CharField(max_length=15)
   fatigue = serializers.CharField(max_length=15)
   wheezing = serializers.CharField(max_length=15)
   coughing = serializers.CharField(max_length=15)
   shortness_of_breath = serializers.CharField(max_length=15)
   swallowing_difficulty = serializers.CharField(max_length=15)
   chest_pain = serializers.CharField(max_length=15)
   chronic_disease = serializers.CharField(max_length=15)