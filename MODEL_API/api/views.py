from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import ModelFormSerializer
import os
import joblib

try:
   # Model path
   model_path = os.path.join(os.path.dirname(__file__), 'model/predictive_lungcancer_model.joblib')
except FileNotFoundError as err:
   pass

@api_view(['POST'])
def model_form(request):

    model_submission = ModelFormSerializer(data=request.data)

    if model_submission.is_valid():

        field = model_submission.validated_data

        # Data validation for feature
        feature1 = 2 if field['smoking'] == 'yes' else 1
        feature2 = 2 if field['fatigue'] == 'yes' else 1
        feature3 = 2 if field['wheezing'] == 'yes' else 1
        feature4 = 2 if field['coughing'] == 'yes' else 1
        feature5 = 2 if field['shortness_of_breath'] == 'yes' else 1
        feature6 = 2 if field['swallowing_difficulty'] == 'yes' else 1
        feature7 = 2 if field['chest_pain'] == 'yes' else 1
        feature8 = 2 if field['chronic_disease'] == 'yes' else 1

        # Load model
        model = joblib.load(open(model_path, 'rb'))

        # Predict new data
        prediction = model.predict([[feature1, feature2, feature3, feature4, feature5, feature6, feature7, feature8]])

        return Response({ 'predicted': prediction[0]}, status=status.HTTP_200_OK)
    
    return Response(model_submission.errors, status=status.HTTP_400_BAD_REQUEST)
