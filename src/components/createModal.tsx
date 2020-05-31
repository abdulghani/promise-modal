import ReactDOM from "react-dom";
import React, { MouseEvent } from "react";

export declare interface ModalProp {
  onConfirm: (e: Event | MouseEvent) => void;
  onCancel: (e: Event | MouseEvent) => void;
  [args: string]: any;
}

const createModal = (Modal: React.FC<ModalProp>): Function => {
  let promise: Promise<any>, resolve: Function, reject: Function;

  const key = Math.floor(Math.random() * 1000000);
  const container = document.createElement("div");
  container.setAttribute("id", `modal-root-${key}`);

  const init = () => {
    promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    document.getElementById("root").appendChild(container);
  };

  const removeContainer = () => {
    ReactDOM.unmountComponentAtNode(container);
    document.getElementById("root").removeChild(container);
  };

  const onCancel = (e: Event) => {
    e && e.stopPropagation();
    removeContainer();
    reject();
  };

  const onConfirm = (e: Event) => {
    e && e.stopPropagation();
    removeContainer();
    resolve();
  };

  return (props: any) => {
    init();
    ReactDOM.render(
      <Modal onCancel={onCancel} onConfirm={onConfirm} {...props} />,
      container
    );
    return promise;
  };
};

export default createModal;
