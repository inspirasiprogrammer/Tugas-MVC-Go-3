import React, {useState, useEffect }  from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Navbar, Container, Form, Button, Row, Col, Dropdown } from "react-bootstrap";
import logoImg from "../../assets/simplebank.png";
import userImg from "../../assets/user.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../transactions/style.scss"
import { logout } from '../../actions/userActions';
import { deposit, withdrawal, transfer, saldo, mutasi } from '../../actions/transactionActions'

const Transactions = ({ history }) => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  }

  const userLogin = useSelector((state) => state.userLogin)
  const { token } = userLogin

  const [amountDeposit, setAmountDeposit] = useState("");
  const [descDeposit, setDescDeposit] = useState("");
  const [amountWithdrawal, setAmountWithdrawal] = useState("");
  const [descWithdrawal, setDescWithdrawal] = useState("");
  const [accountTransfer, setAccountTransfer] = useState("");
  const [amountTransfer, setAmountTransfer] = useState("");
  const [descTransfer, setDescTransfer] = useState("");

  useEffect(() => {
    setAmountDeposit("");
    setDescDeposit("");
    setAmountWithdrawal("");
    setDescWithdrawal("");
    setAccountTransfer("");
    setAmountTransfer("");
    setDescTransfer("");
  }, [])

  useEffect(() => {
    if (token) {
      dispatch(saldo())
    }
  }, [dispatch, history,token])

  useEffect(() => {
    if (token) {
      dispatch(mutasi())
    }
  }, [dispatch, token])
  
  const transactionSaldo = useSelector((state) => state.transactionSaldo)
  const transactionMutasi = useSelector((state) => state.transactionMutasi)
  const { saldoTotal } = transactionSaldo
  const { mutasiTotal } = transactionMutasi
  const accountTransaction = saldoTotal?.transaction
  const accountDeposit = saldoTotal?.account?.account_number
  const accountWithdrawal = saldoTotal?.account?.account_number
  const accountTransferSender = saldoTotal?.account?.account_number

  const submitDepositHandler = (e) => {
    e.preventDefault();
    dispatch(deposit(accountDeposit, amountDeposit, descDeposit));
  }
  const submitWithdrawalHandler = (e) => {
    e.preventDefault();
    dispatch(withdrawal(accountWithdrawal, amountWithdrawal, descWithdrawal));
  }
  const submitTransferHandler = (e) => {
    e.preventDefault();
    dispatch(transfer(accountTransfer, accountTransferSender, amountTransfer, descTransfer));
  }

  
  return (
    <Container>
      <Tabs>
        <Navbar bg="light">
          <Navbar.Collapse>
            <Navbar.Brand>
              <img
                src={logoImg}
                width="200"
                height="100"
                className="d-inline-block align-top"
                alt="logo"
              />
            </Navbar.Brand>
            <Navbar.Collapse className="justify-content-end">
              <Dropdown id="dropdown-basic">
                <Navbar.Brand>
                  <Dropdown.Toggle className="customDropdown">
                  <img
                    src={userImg}
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    alt="user"
                  />
                  </Dropdown.Toggle>
                </Navbar.Brand>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={logoutHandler}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Navbar>
        <TabList>
          <Tab>Deposit</Tab>
          <Tab>Withdraw</Tab>
          <Tab>Transfer</Tab>
          <Tab>Mutasi Rekening</Tab>
        </TabList>
        <TabPanel>
          <div className="d-flex justify-content-center my-4">
            <h1>DEPOSIT</h1>
          </div>
          <div className="mb-5">
            <h4>Selamat Datang Kembali {saldoTotal != null && saldoTotal.account ? saldoTotal.account.name : 0} </h4>            
            <h4>Account Number anda adalah {saldoTotal != null && saldoTotal.account ? saldoTotal.account.account_number : 0} </h4>          
            <h4>Sisa Saldo anda adalah {new Intl.NumberFormat('IDN', {
                                style: 'currency',
                                currency: 'IDR'
                              }).format(saldoTotal != null && saldoTotal.account ? saldoTotal.account.saldo : 0)}
            </h4>
          </div>
          <Form onSubmit={submitDepositHandler} className="mt-3">
            <Form.Group as={Row} controlId="formPlaintextAmount">
              <Form.Label column sm="2">
                Total Amount
              </Form.Label>
              <Col sm="10">
                <Form.Control 
                  type="amount" 
                  placeholder="Input the amount" 
                  value={amountDeposit}
                  onChange={(e) => setAmountDeposit(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="exampleForm.ControlTextareaDesc">
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control 
                  as="textarea" 
                  rows={3}
                  value={descDeposit}
                  onChange={(e) => setDescDeposit(e.target.value)} 
                />
              </Col>
            </Form.Group>
            <Col sm={{ span: 10, offset: 11 }}>
              <Button variant="danger" type="submit">
                Send
              </Button>
            </Col>
          </Form>
        </TabPanel>
        <TabPanel>
          <div className="d-flex justify-content-center my-4">
            <h1>WITHDRAWAL</h1>
          </div>
          <div className="mb-5">
            <h4>Selamat Datang Kembali {saldoTotal != null && saldoTotal.account ? saldoTotal.account.name : 0} </h4>            
            <h4>Account Number anda adalah {saldoTotal != null && saldoTotal.account ? saldoTotal.account.account_number : 0} </h4>          
            <h4>Sisa Saldo anda adalah {new Intl.NumberFormat('IDN', {
                                style: 'currency',
                                currency: 'IDR'
                              }).format(saldoTotal != null && saldoTotal.account ? saldoTotal.account.saldo : 0)}
            </h4>         

          </div>
          <Form onSubmit={submitWithdrawalHandler} className="mt-3">
            <Form.Group as={Row} controlId="formPlaintextAmountWithdraw">
              <Form.Label column sm="2">
                Total Amount
              </Form.Label>
              <Col sm="10">
                <Form.Control 
                  type="amount" 
                  placeholder="Input the amount" 
                  value={amountWithdrawal}
                  onChange={(e) => setAmountWithdrawal(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="exampleForm.ControlTextareaDescWithdraw"
            >
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={descWithdrawal}
                  onChange={(e) => setDescWithdrawal(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Col sm={{ span: 10, offset: 11 }}>
              <Button variant="danger" type="submit">
                Withdraw
              </Button>
            </Col>
          </Form>
        </TabPanel>
        <TabPanel>
          <div className="d-flex justify-content-center my-4">
            <h1>TRANSFER</h1>
          </div>
          <div className="mb-5">
            <h4>Selamat Datang Kembali {saldoTotal != null && saldoTotal.account ? saldoTotal.account.name : 0} </h4>            
            <h4>Account Number anda adalah {saldoTotal != null && saldoTotal.account ? saldoTotal.account.account_number : 0} </h4>          
            <h4>Sisa Saldo anda adalah {new Intl.NumberFormat('IDN', {
                                style: 'currency',
                                currency: 'IDR'
                              }).format(saldoTotal != null && saldoTotal.account ? saldoTotal.account.saldo : 0)}
            </h4>         
          </div>
          <Form onSubmit={submitTransferHandler} className="mt-3">
            <Form.Group as={Row} controlId="formPlaintextRecepient">
              <Form.Label column sm="2">
                Recepient
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="account"
                  placeholder="Input the Recepient Account Number "
                  value={accountTransfer}
                  onChange={(e) => setAccountTransfer(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formPlaintextAmountTransfer">
              <Form.Label column sm="2">
                Total Amount
              </Form.Label>
              <Col sm="10">
                <Form.Control 
                  type="amount" 
                  placeholder="Input the amount" 
                  value={amountTransfer}
                  onChange={(e) => setAmountTransfer(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              controlId="exampleForm.ControlTextareaDescTransfer"
            >
              <Form.Label column sm="2">
                Description
              </Form.Label>
              <Col sm="10">
                <Form.Control 
                  as="textarea" 
                  rows={3} 
                  value={descTransfer}
                  onChange={(e) => setDescTransfer(e.target.value)}
                  />
              </Col>
            </Form.Group>
            <Col sm={{ span: 10, offset: 11 }}>
              <Button variant="danger" type="submit">
                Transfer
              </Button>
            </Col>
          </Form>
        </TabPanel>
        <TabPanel>
          {/* isi code mutasi rekening disini */
          
          }
          <div className="d-flex justify-content-center my-4">
            <h1>MUTASI</h1>
          </div>
          
          <div className="mb-5">                                  
            <h4>Sisa Saldo anda adalah {new Intl.NumberFormat('IDN', {
                                style: 'currency',
                                currency: 'IDR'
                              }).format(saldoTotal != null && saldoTotal.account ? saldoTotal.account.saldo : 0)}
            </h4>          
          </div>
        
          <table className="tab1e table—striped">
            <thead>
            <tr>
                <th scope="col">Date</th>
                <th scope="col">Tipe</th>            
                <th scope="col">Sender</th>
                <th scope="col">Recipient</th>   
                <th scope="col">Keterangan</th>
                <th scope="col">Amount</th>                         
            </tr>
            </thead>
            <tbody>
            {mutasiTotal !== null && accountTransaction ? accountTransaction.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{new Date(item.timestamp).toUTCString()}</th>
                <td>{item.transaction_type === 1 ? "Withdrawal" :
                    item.transaction_type === 2 ? "Deposit" :
                    item.transaction_type === 0 ? "Transfer" : "Transfer"}</td>
                <td>{item.sender}</td>
                <td>{item.recipient}</td>                
                <td>{item.transaction_description}</td>                
                <td>{new Intl.NumberFormat('IDN', {
                                style: 'currency',
                                currency: 'IDR'
                              }).format(item.amount)}</td>                
              </tr>)
            }) : "do error"}
            </tbody>
          </table>             
        </TabPanel>
      </Tabs>
    </Container>
  );
}

export default Transactions;
