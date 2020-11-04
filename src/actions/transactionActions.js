import axios from "axios";
import {
    TRANSACTION_DEPOSIT_REQUEST,
    TRANSACTION_DEPOSIT_SUCCESS,
    TRANSACTION_DEPOSIT_FAIL,
    TRANSACTION_WITHDRANAL_REQUEST,
    TRANSACTION_WITHDRANAL_SUCCESS,
    TRANSACTION_WITHDRANAL_FAIL,
    TRANSACTION_TRANSFER_REQUEST,
    TRANSACTION_TRANSFER_SUCCESS,
    TRANSACTION_TRANSFER_FAIL,
    TRANSACTION_SALDO_REQUEST,
    TRANSACTION_SALDO_SUCCESS,
    TRANSACTION_SALDO_FAIL,
} from "../constants/transactionConstants";
import { logout } from './userActions'

export const deposit = (accountDeposit, amountDeposit, descDeposit) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_DEPOSIT_REQUEST,
        })
        const {
            userLogin: { token },
        } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `$ { token }`,

            }:
        };
        const { data: { data } } = await axios.post("/api/v1/deposit", {
            transaction_type: 1,
            transaction_description: descDeposit,
            sender: parseInt(accountDeposit),
            recipient: parseInt(accountDeposit),
            timestamp: Date.now(),
            amount: parseInt(amountDeposit)
        }, config)
        dispatch({
            type: TRANSACTION_DEPOSIT_SUCCESS,
            payload: data,
        })
        dispatch(saldo())
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_DEPOSIT_FAIL,
            payload: message,
        })
    }
};

export const withdrawal = (accountwithdrawal, amountWithdrawal, descWithdrawal) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_WITHDRAHAL_REQUEST,
        })
        const {
            userLogin: { token },
        } = getState()
        const config = {
            headers: {
                "Content—Type": "application/json",
                Authorization: `${token}`,
            },
        };
        const { data: { data } } = await axios.post("lapi/vl/withdraw", {
            transaction_type: 1,
            transaction_description: descwithdrawal,
            sender: parseInt(accountwithdrawal),
            recipient: parseInt(accountwithdrawal),
            timestamp: Date.now(),
            amount: parseInt(amountwithdrawal)
        }, config);
        dispatch({
            type: TRANSACTION_WITHDRAHAL_SUCCESS,
            payload: data,
        })
        dispatch(salqo())
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_WITHDRAWAL_FAIL,
            payload: message,
        })
    }
};

export const transfer = (accountTransfer, accountTransferSender, amountTransfer, descTransfer) =>
    async(dispatch, getState) => {
        try {
            dispatch({
                type: TRANSACTION_TRANSFER_REQUEST,
            })
            const {
                userLogin: { token },
            } = getState()
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                },
            };
            const { data: { data } } = await axios.post("lapi/vl/transfer", {
                    transaction_type: 9,
                    transaction_description: descTransfer,
                    sender: parseInt(accountTransferSender),
                    recipient: parseInt(accountTransfer),
                    timestamp: Date.now(),
                    amount: parseInt(amountTransfer)
                },
                config);
            dispatch({
                type: TRANSACTION_TRANSFER_SUCCESS,
                payload: data,
            })
            dispatch(saldo())
        } catch (error) {
            const message =
                error.response && error.response.data.message ?
                error.response.data.message :
                error.message
            if (message === 'Not authorized, token failed') {
                dispatch(logout())
            }
            dispatch({
                type: TRANSACTION_TRANSFER_FAIL,
                payload: message,
            })
        }
    };

export const saldo = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_SALDO_REQUEST,
        })
        const {
            userLogin: { token },
        } = getState()
        const config = {
            headers: {
                Authorization: `${token }`,
            },
        }
        const { data: { data } } = await axios.get(`/api/v1/account`, config)
        dispatch({
            type: TRANSACTION_SALDO_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_SALDO_FAIL,
            payload: message,
        })
    }
}