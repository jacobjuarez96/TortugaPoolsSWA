using System.ComponentModel.DataAnnotations;

namespace BlazorApp.Shared.Models
{
    public class ContactFormModel
    {
        [Required]
        public string Name { get; set; }

        //[Required]
        //[EmailAddress(ErrorMessage = "Please enter a valid email address.")]
        //public string Email { get; set; }

        //public string Phone { get; set; }

        //[Required]
        //public string Subject { get; set; }

        //[Required]
        //public string Message { get; set; }
    }
}
