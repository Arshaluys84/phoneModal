import useModal from './hooks/useModal';
import { Modal } from './modal/Modal';
import { ModalContent } from './modal/ModalContent';

const App = () => {

  const { isOpen, toggle } = useModal()

  return (
    <div>
      <button onClick={toggle}>Open Modal </button>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalContent toggle={toggle} />
      </Modal>
    </div>
  );
};

export default App;
