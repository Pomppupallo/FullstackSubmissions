import React from 'react'

const FindCountries = ( {newSearch, handleSearchChange}) => {
    
    return(
        <div>
            <p>find countries:
                <input
                value={newSearch}
                onChange={handleSearchChange}
                />
            </p>
        </div>
    )
}

export default FindCountries