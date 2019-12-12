import { useContext } from 'react';
import ConfirmDialogContext from './ConfirmDialogContext';

export default () => {
    const { showConfirmDialog } = useContext(ConfirmDialogContext);

    return {
        showConfirmDialog
    };
};