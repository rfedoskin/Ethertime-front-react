import Web3 from 'web3';
import store from '../redux/store';
import { getContract } from '../redux/reducers/contractReducer';
import { updateMetamaskConnection } from '../redux/actions/accountActions';

function accountChangeHandler(accounts) {
  // If disconnected
  if (!store.getState().accountReducer.isConnected) {
    return;
  }
  // If logout
  if (accounts.length < 1 || accounts[0] === undefined) {
    store.dispatch(updateMetamaskConnection(false));
    return;
  }
  // If account changing
  store.dispatch(updateMetamaskConnection(true));
}

export default function loadWeb3() {
  const isMetamaskConnected = localStorage.getItem('isMetamaskConnected');

  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);

    if (JSON.parse(isMetamaskConnected)) {
      store.dispatch(updateMetamaskConnection(true));
    }

    // В ethereum кошелька Opera нет функции on
    if (!window.ethereum.on) {
      return;
    }

    window.ethereum.on('accountsChanged', accounts => {
      accountChangeHandler(accounts);
    });
  } else if (window.web3) {
    window.web3 = new Web3(Web3.givenProvider);

    if (JSON.parse(isMetamaskConnected)) {
      store.dispatch(updateMetamaskConnection(true));
    }

    const { publicConfigStore } = window.web3.currentProvider;

    if (publicConfigStore.on) {
      publicConfigStore.on('update', account => {
        const accounts = [account.selectedAddress];

        accountChangeHandler(accounts);
      });
    }
  } else {
    // For Browsers without MM
    const provider = new Web3.providers.HttpProvider(
      'https://ropsten.infura.io/v3/2b27537391214eb385eba5f6b059b452'
    );
    const web3 = new Web3(provider);
    window.web3 = web3;
  }
}

export function convertFromWei(weiNumber) {
  if (typeof weiNumber !== 'number') {
    return 0;
  }

  const { web3 } = window;

  let numberValue = Number(web3.utils.fromWei(`${weiNumber}`, 'ether'));
  if (!Number.isInteger(numberValue)) {
    numberValue = parseFloat(numberValue.toFixed(6));
  }
  return numberValue;
}

export function getMethodCallData(methodName, ...params) {
  const { web3 } = window;
  const state = store.getState();
  const contract = getContract(state);

  const contractMethod = contract.options.jsonInterface.find(method => method.name === methodName);
  if (!contractMethod) {
    return '0x0';
  }

  try {
    return web3.eth.abi.encodeFunctionCall(contractMethod, params);
  } catch (error) {
    console.log(
      `Cannot generate function call data. Function: ${methodName}, parameters: ${params}.\n${error}`
    );
    return '0x0';
  }
}
