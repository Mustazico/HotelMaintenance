namespace backend.Models
{
    public class Room
    {
        public int RoomId { get; set; }
        public string RoomName { get; set; }
        public string RoomType { get; set;}
        public int Beds { get; set; }

        public bool Availability { get; set; }
    }
}
