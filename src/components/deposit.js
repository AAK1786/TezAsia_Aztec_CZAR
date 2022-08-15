import React, { useState, useRef } from 'react'
import { lendTez } from '../utils/operations';
import './table.css'
// import DepositDesc from './details'
export default function Deposit() {

    const [loading, setLoading] = useState(false)

    const ref = useRef(null)
    const displayModal = () => {
        ref.current.click();
    }

    var form = document.getElementById('formID');
    var submitButton = document.getElementById('depo');

    form.addEventListener('submit', function () {

        // Disable the submit button
        submitButton.setAttribute('disabled', 'disabled');

        // Change the "Submit" text
        submitButton.value = 'Please wait...';

    }, false);
    
    let depositLedger = [];
    // example {id:1592304983049, title: 'Deadpool', year: 2015}
    const addInfo = (ev) => {
        ev.preventDefault();  //to stop the form submitting
        let info = {
            amount: document.getElementById('depositAmount').value,
        }
        depositLedger.push(info);
        // document.forms[0].reset(); // to clear the form for the next entries
        document.querySelector('form').reset();

        //for display purposes only
        console.warn('added', { depositLedger });
        // let pre = document.querySelector('#msg pre');
        // pre.textContent = '\n' + JSON.stringify(depositLedger, '\t', 2);

        //saving to localStorage
        localStorage.setItem('Deposit Ledger', JSON.stringify(depositLedger));
    }
    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('depo').addEventListener('click', addInfo);
    });



    const depositTez = async () => {
        try {
            setLoading(true);
            await lendTez();
        } catch (err) {
            alert('Transaction Failed, ', err.message);
        }
        setLoading(false);
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('depo').addEventListener('click', depositTez);
    });
    return (
        <>
            <div className='tables'>

                <h5>Deposit</h5>
                <table class="table table-hover table-borderless text-center">
                    <thead>
                        <tr>
                            <th scope="col">Token</th>
                            <th scope="col">APY</th>
                            <th scope="col">Total Deposited</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='tablerow' onClick={() => { displayModal() }} >
                            <td>Tez</td>
                            <td>xy</td>
                            <td>xy</td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div>
                <button ref={ref} type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#depositModal" data-whatever="@mdo">Lend</button>

                <div class="modal fade" id="depositModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Deposit</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form id='formID' >
                                    <p> Enter amount of Tez you want to deposit. </p>
                                    <div class="form-group">
                                        <label for="amount-deposit" class="col-form-label" >Amount:</label>
                                        <input type="number" class="form-control" id="depositAmount" />
                                    </div>

                                    <p> Enter the duration for which you want to deposit. </p>

                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-primary btn-success " id='depo' value="Submit">
                                            {loading == true ? "Loading..." : "Deposit"}</button>
                                        <button type="submit" class="btn btn-primary btn-danger" id='withdraw' value="Submit">Withdraw</button>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}