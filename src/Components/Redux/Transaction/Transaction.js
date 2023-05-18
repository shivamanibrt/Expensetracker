import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../Firebase/firebaseConfig";
import { setTrans } from "./transSlic";

//call the transaction from firebase 
export const getTransaction = (userId) => async (dispatch) => {
    try {
        const q = query(collection(db, 'transaction'), where('userId', '==', userId));
        const { docs } = await getDocs(q);

        const trans = [];

        docs.forEach((doc) => {
            trans.push({ ...doc.data(), id: doc.id });
        });
        dispatch(setTrans(trans));

    } catch (error) {
        toast.error(error.message);
    }
}
//add transaction
export const addTransactionAction = (data) => async (dispatch) => {
    try {
        const resPending = addDoc(collection(db, 'transaction'), data);
        toast.promise(resPending, {
            pending: 'please wait...'
        });
        const result = await resPending;
        if (result?.id) {
            toast.success('New transaction has been added')
            //get all transaction
            dispatch(getTransaction(data.userId));
        }

    } catch (error) {
        toast.error(error.message);
    }
}

//delete the transaciton based on given id
export const deleteTranAction = (id, userId) => async (dispatch) => {
    try {
        const resPending = deleteDoc(doc(db, 'transaction', id));

        toast.promise(resPending, {
            pending: 'Please wait while we deleting the data'
        });
        await resPending;

        dispatch(getTransaction(userId));

        toast.success('Deleted');

    } catch (error) {
        toast.error(error.message)
    }
} 
