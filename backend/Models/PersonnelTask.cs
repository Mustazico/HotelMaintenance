namespace backend.Models
{
    public class PersonnelTask
    {
        public int TaskId { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public string AssignedRole { get; set; }
        public string Notes { get; set; }
    }
}
