# React Promise based Modal
You can simply create your own modal component with jsx react component and render it as a promise with a function call.

```typescript
  // somewhere in your component
  const handleDelete = (e: MouseEvent) => {
    showModal()
      .then((e) => {
        // do something when confirmed
      })
      .catch((e) => {
        // do something when cancelled
      });
  }
```

## Installation
yarn `yarn add @abdulghani/promise-modal`\
npm `npm install @abdulghani/promise-modal`

## Usage
Prepare your modal component that's going to render your modal that had at least `onConfirm` and `onCancel` props.\
with the types of
```typescript
  onConfirm: (e: MouseEvent) => void;
  onCancel: (e: MouseEvent) => void;
```

Then you can import the function from this package.
```typescript
  import {createModal} from "@abdulghani/promise-modal";
```

You need to create the modal promise instance to call.
```typescript
  const deleteModal = createModal(YourModalComponent);
```

Then you can call the function away to show the modal in your component.

```tsx

  const YourComponent: React.FC = () => {
    
    const showModal = (e: MouseEvent) => {
      deleteModal()
        .then(e => {
          //  do something when confirmed
        })
        .catch(e => {
          // do something when cancelled
        });
    }

    return (
      <button type="button" onClick={showModal}>Show the modal</button>
    )
  }
```

## Config & Properties
### custom root node
By default it targets the `root` node id in your dom to mount the modal element.\
you could customize that by passing your root node id to the second argument of `createModal` function.\
like so
```typescript
  const deleteModal = createModal(YourModalComponent, "my-custom-root");
```

### passing custom props to your modal
You could pass custom props to your modal for example like `title, description, confirmText, cancelText, etc` by handling it on your modal component. and passing it to the show modal call.\
```typescript
  const YourModalComponent = (props: any) => {
    const {onConfirm: any, onCancel: any, title: string, description: string} = props;

    // rest of your modal component
  }
```

and you could pass arguments to the modal like so
```typescript
  // somewhere in your main component
  const showModal = (e: MouseEvent) => {
    deleteModal({
      title: "hello world",
      description: "my custom description here"
    })
    .then(e => {
      // do something when confirmed
    })
    .catch(e => {
      // do something when cancelled
    });
  }
```