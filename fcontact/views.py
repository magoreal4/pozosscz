from django.shortcuts import render

from django.core.mail import send_mail, BadHeaderError

from django.http import HttpResponse

from .forms import ContactForm

def contact_form(request):
    submitted = False
    # if this is a POST request we need to process the form data
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            subject = "Enviado desde la WEB Pozos SCZ"
            body = {
                'name': form.cleaned_data['name'], 
                'email': form.cleaned_data['email'], 
                'message':form.cleaned_data['message'], 
                }
            message = "\n".join(body.values())   
            try:
                send_mail(subject, message, 'contacto@pozosscz.com', ['magoreal4@gmail.com']) 
            except BadHeaderError:
                return HttpResponse('Invalid header found.')
            return render (request, "contacto:hola")
    else:
        form =ContactForm()
        if 'submitted' in request.GET:
            submitted = True
    
    return render(request, 'contactform.html', {'form':form, 'submitted':submitted})

    
    
