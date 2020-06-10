import ReactDOM from "react-dom";
import React, { MouseEvent } from "react";

export declare interface ModalProp {
  onConfirm: (e: Event | MouseEvent | undefined) => void;
  onCancel: (e: Event | MouseEvent | undefined) => void;
  [args: string]: any;
}

function createModal<ChildProps>(
  Modal: React.FC<ModalProp>,
  root: string = "root"
): (p?: ChildProps) => Promise<[string, MouseEvent | undefined]> {
  let promise: Promise<[string, MouseEvent | undefined]>,
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

  const onConfirm = (e: MouseEvent | undefined) => {
    e && e.persist();
    e && e.stopPropagation();
    removeContainer();
    resolve(["confirmed", e]);
  };

  const onCancel = (e: MouseEvent | undefined) => {
    e && e.persist();
    e && e.stopPropagation();
    removeContainer();
    reject(["cancelled", e]);
  };

  return (props?: ChildProps): Promise<[string, MouseEvent | undefined]> => {
    init();
    ReactDOM.render(
      <Modal onCancel={onCancel} onConfirm={onConfirm} {...props} />,
      container
    );
    return promise;
  };
}

export default createModal;
