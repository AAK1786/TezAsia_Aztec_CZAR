import React from 'react'
import './table.css'

export default function Loan() {
    return (
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
                    <tr  className='tablerow'>
                        <td>Tez</td>
                        <td>xy</td>
                        <td>xy</td>
                    </tr>
                    <tr  className='tablerow'>
                        <td>Tez</td>
                        <td>xy</td>
                        <td>@xy</td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}