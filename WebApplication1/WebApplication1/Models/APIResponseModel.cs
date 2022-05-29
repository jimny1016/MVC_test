using System.Collections.Generic;

namespace WebApplication1.Models
{
    public class APIResponse<T>
    {
        public List<T> Result { get; set; }
        public bool Success { get; set; }
        public string Document { get; set; }
    }
}
