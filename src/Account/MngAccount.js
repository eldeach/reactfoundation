import MngTable from './../MngTable/MngTable'

function MngAccount(){
    return(
        <div>
            <MngTable getUrlStr={'/getmngaccount'} targetPk={{}} chkSel={true} deleteButton={true} addToListButton={false} editable={true} selectButton={false}/>
        </div>

    )
}

export default MngAccount