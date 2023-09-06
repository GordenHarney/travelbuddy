import ChatRoom from "../pages/ChatRoom";

const LandingSection3 = () => {
  return (
    <div className="flex mx-auto left-0 right-0 w-2/4 py-10">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img src="/resources/images/Section-2/ai.jpg" alt="Album" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">New chatbot is available!</h2>
          <p>Chat With Our New Ai Powered Chat Assistant</p>
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
              onClick={() => window.my_modal_3.showModal()}
            >
              Chat
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <div className="py-5 px-5">
                  <ChatRoom />
                </div>
                <p className="py-4 text-center">
                  Press ESC key or click outside to close
                </p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingSection3;
