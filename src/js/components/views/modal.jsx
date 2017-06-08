import React from 'react';
import PropTypes from 'prop-types';

const Modal = props => (
    <div className="modal-wrapper">
        <div className="modal fade in">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={props.onClose} aria-hidden="true">&times;</button>
                        <h4 className="modal-title">{props.title}</h4>
                    </div>
                    <div className="modal-body">
                        {props.children}
                    </div>
                </div>
            </div>
        </div>
        <div className="modal-backdrop fade in" />
    </div>
);

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onClose: PropTypes.func.isRequired
};

export default Modal;

