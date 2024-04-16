using System.ComponentModel.DataAnnotations;

namespace Entities.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$",
            ErrorMessage = "Пароль должен иметь 1 заглавную, 1 прописную буквы, 1 цифру, 1 символ и должен состоять как минимум из 6 символов")]
        public string Password { get; set; }
    }
}
