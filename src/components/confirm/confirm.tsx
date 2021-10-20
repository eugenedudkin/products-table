import './confirm.css';
import Button from '../button';
import { FC } from 'react';

const Confirm: FC<ConfirmProps> = (props: ConfirmProps) => {

    const {close, onOk, confirmText} = props;

    const okHandler = () => {
        onOk();
        close();
    };
    const cancelHandler = () => {
        close()
    };

    return (    
            <div className='confirm'>
                <h2>Are you sure?</h2>
                <hr />
                <div className="text">
                    {confirmText}
                </div>
                <div className="buttons">
                    <Button onClick={okHandler} className="default" text="Yes"/>
                    <Button onClick={cancelHandler} className="default" text="No"/>
                </div>
            </div>
    )
}

export default Confirm;

type ConfirmProps = {
    close: any;
    onOk: any;
    confirmText: string
}
