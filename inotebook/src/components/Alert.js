import React from 'react'

const Alert = (props) => {
  return (
    <div>
      {/* <div className="alert alert-primary" role="alert">
            {props.message}
    </div> */}

    {props.alert &&
    <div className={`alert ${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{props.alert.msg}</strong> 
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
}

    </div>
  )
}

export default Alert
