import ReactDOM from "react-dom";
import React, { MouseEvent } from "react";

export declare interface ModalProp {
  onConfirm: (e: Event | MouseEvent | undefined) => void;
  onCancel: (e: Event | MouseEvent | undefined) => void;
  [args: string]: any;
}

function createModal(
  Modal: React.FC<ModalProp>,
  root: string = "root"
): Function {
  let promise: Promise<Event | MouseEvent | undefined>,
    resolve: Function,
    reject: Function;

  const key = Math.floor(Math.random() * 1000000);
  const container = document.createElement("div");
  container.setAttribute("id", `modal-root-${key}`);

  const init = () => {
    promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    document.getElementById(root).appendChild(container);
  };

  const removeContainer = () => {
    ReactDOM.unmountComponentAtNode(container);
    document.getElementById(root).removeChild(container);
  };

  const onCancel = (e: Event | MouseEvent | undefined) => {
    e && e.stopPropagation();
    removeContainer();
    reject(e);
  };

  const onConfirm = (e: Event | MouseEvent | undefined) => {
    e && e.stopPropagation();
    removeContainer();
    resolve(e);
  };

  return (props: any) => {
    init();
    ReactDOM.render(
      <Modal onCancel={onCancel} onConfirm={onConfirm} {...props} />,
      container
    );
    return promise;
  };
}

export default createModal;
