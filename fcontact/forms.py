
from django import forms

from django.core import validators
# Create your forms here.

class ContactForm(forms.Form):
	name = forms.CharField(
		max_length = 25,
		required=True,
		label='Nombre',
		widget=forms.TextInput(
			attrs={
				'class':'w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline mb-3',				
			}),
		validators=[
			validators.MinLengthValidator(3, 'El nombre es demasiado corto'),
			validators.RegexValidator('^[A-Za-z]*$', "Nombre inválido",'invalide_name')
		]
		)
	email = forms.EmailField(
		max_length = 25,
		required=True,
		label='Correo electrónico',
		widget=forms.TextInput(
			attrs={
				'class':'w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline mb-3',	
			}),
		validators=[
			validators.EmailValidator("Formato de correo inválido")
		]
		)

	message = forms.CharField(
		max_length = 1000, 
		required=True,
		label='Mensaje',
		widget = forms.Textarea(
			attrs={
				'class':'w-full text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline mb-3',	
		}),

		)