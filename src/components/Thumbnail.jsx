const Thumbnail = ({ photo }) => {
  return (
    <img
      className="w-full"
      alt={`Thumbnail for "${photo.title}"`}
      src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_q.jpg`}
    />
  );
};

export default Thumbnail;
