import React from "react";
import { connect } from "react-redux";
import TestModal from "./TestModal";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const modalLookup = {
  TestModal,
  LoginModal,
  RegisterModal,
};

const mapStateToProps = (state) => ({
  currentModal: state.modals,
});

const ModalManager = ({ currentModal }) => {
  let renderedModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderedModal = <ModalComponent {...modalProps} />;
  }
  // if we have a modal open, the renderedModal will be ModalComponent which is the modalType we pass through redux action to reducer, updating store, which gives us modalType in properties.
  return <span>{renderedModal}</span>;
};

export default connect(mapStateToProps)(ModalManager);
