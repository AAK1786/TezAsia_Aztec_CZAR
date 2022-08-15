import React , {useRef} from 'react'
import './table.css'

export default function Loan() {
    const ref = useRef(null)

    const displayBorrowModal = () => {
        ref.current.click();
    }

    let borrowLedger = [];
    // example {id:1592304983049, title: 'Deadpool', year: 2015}
    const addInfo = (ev)=>{
        ev.preventDefault();  //to stop the form submitting
        let info = {
            amount : document.getElementById('borrowAmount').value,
        }
        borrowLedger.push(info);
        document.forms[0].reset(); // to clear the    form for the next entries
        // document.querySelector('form').reset();

        //for display purposes only
        console.warn('added' , {borrowLedger} );
        // let pre = document.querySelector('#msg pre');
        // pre.textContent = '\n' + JSON.stringify(borrowLedger, '\t', 2);

        //saving to localStorage
        localStorage.setItem('Borrow Ledger', JSON.stringify(borrowLedger) );
    }
    document.addEventListener('DOMContentLoaded', ()=>{
        document.getElementById('done').addEventListener('click', addInfo);
    });


    
    return (
        <>
            <div className='tables '>

                <h5>Borrow</h5>
                <table class="table table-hover table-borderless text-center ">
                    <thead>
                        <tr>
                            <th scope="col">Token</th>
                            <th scope="col">APY</th>
                            <th scope="col">Total Borrowed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className='tablerow' onClick={() => {displayBorrowModal()}}>
                            <td>Tez</td>
                            <td>xy</td>
                            <td>xy</td>
                        </tr>
                 
                    </tbody>
                </table>
            </div>

            <div>
                <button ref={ref} type="button" class="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#borrowModal" data-whatever="@mdo">Borrow</button>

                <div class="modal fade" id="borrowModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Borrow</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form>
                                    <p> Enter amount of Tez you want to Borrow. </p>
                                    <div class="form-group">
                                        <label for="borrow-amount" class="col-form-label">Amount:</label>
                                        <input type="number" class="form-control" id="borrowAmount" value = '0' />
                                    </div>
                                    <div class="modal-footer">
                                        <button type="submit" class="btn btn-primary" id='done' value="Submit" >Done</button>
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