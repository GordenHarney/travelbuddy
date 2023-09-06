
const Response = ({ message }) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="https://www.siteminder.com/wp-content/uploads/2020/07/08SMMK_changing-traveller-report_resource-centre-tile_thailand.jpg" alt="TravelBot Avatar" />
        </div>
      </div>
      <div className="chat-header">TravelBot</div>
      <div className="chat-bubble">
        <div className="p-2">{message}</div>
      </div>
    </div>
  );
};

export default Response;
