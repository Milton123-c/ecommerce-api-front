import "./loading.css";

const Loading = () => {
  return (
    <article className="container__loading">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </article>
  );
};

export default Loading;
