// class FormSubmit {
//     constructor(settings) {
//         this.settings = settings;
//         this.form = document.querySelector(settings.form)
//         this.formButton = document.querySelector(settings.formButton)

//         if(this.form) {
//             this.url = this.form.getAttribute("action")
//         }
//     }

//     displaySuccess() {
//         // const button = document.querySelector('.contact-right button')
    
//         // const popup = document.querySelector('.popup-wrapper')
    
//         // button.addEventListener('click', () => {
//         //     popup.style.display = 'block'
//         //     console.log("Clicou")
//         // })
//         this.form.innerHTML = this.settings.success;
//     }

//     displayError() {
//         this.form.innerHTML = this.settings.error;
//     }
    
//     init() {
//         if(this.form){
//             this.formButton.addEventListener("click", () => this.displaySuccess());
//             return this;
//         }
//     }
// }

// const formSubmit = new FormSubimit({
//     form: "[data-form]",
//     button: "[data-button]",
//     success: "<h1>Thanks for the contact!</h1>" +
//     "<p>I'll contact you as soon as possible.</p>",
//     error: "<h1>It was not possible to send your message.</h1>",
// });

// formSubmit.init();

class FormSubmit {
    constructor(settings) {
      this.settings = settings;
      this.form = document.querySelector(settings.form);
      this.formButton = document.querySelector(settings.button);
      if (this.form) {
        this.url = this.form.getAttribute("action");
      }
      this.sendForm = this.sendForm.bind(this);
    }
  
    displaySuccess() {
      this.form.innerHTML = this.settings.success;
    }
  
    displayError() {
      this.form.innerHTML = this.settings.error;
    }
  
    getFormObject() {
      const formObject = {};
      const fields = this.form.querySelectorAll("[name]");
      fields.forEach((field) => {
        formObject[field.getAttribute("name")] = field.value;
      });
      return formObject;
    }
  
    onSubmission(event) {
      event.preventDefault();
      event.target.disabled = true;
      event.target.innerText = "Loading...";
    }
  
    async sendForm(event) {
      try {
        this.onSubmission(event);
        await fetch(this.url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(this.getFormObject()),
        });
        this.displaySuccess();
      } catch (error) {
        this.displayError();
        throw new Error(error);
      }
    }
  
    init() {
      if (this.form) this.formButton.addEventListener("click", this.sendForm);
      return this;
    }
  }
  
  const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<h1 class='success'>Thanks for the contact!</h1>" +
    "<p>I'll contact you as soon as possible.</p>",
    error: "<h1 class='error'>It was not possible to send your message.</h1>",
  });
  formSubmit.init();