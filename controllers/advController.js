const createAdv = async (req, res) => {
    res.send('create advertise')
}

const deleteAdv = async (req, res) => {
    res.send('delete advertise')
}

const getAllAdv = async (req, res) => {
    res.send('get all advertises')
}

const updateAdv = async (req, res) => {
    res.send('update advertise')
}

const showStats = async (req, res) => {
    res.send('show stats')
}

export{createAdv, deleteAdv, getAllAdv, updateAdv, showStats}
