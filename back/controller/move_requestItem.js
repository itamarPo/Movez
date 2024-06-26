const MoveRequestItem = require('../models/index').MoveRequestItems

const getMoveRequestItem = async (req, res) => {
    const requestItemID = req.query.uuid
    try {
        const result = await MoveRequestItem.findByPk(requestItemID)
        if (result) {
            res.status(200).json({ meesage: "success", moveRequestItem: result})
        }
        else {
            res.status(404).json({ message: `No Move Request Item with ID = ${requestItemID} found` })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server error", error: error.message })
    }
}

const getMoveRequestItems = async (req, res) => {
	const moveRequestID = req.query.uuid
	try{
		const result = await MoveRequestItem.findAll({where:{MoveRequestID:moveRequestID}})
		if(result){
			res.status(200).json({message:"success", moveRequestItems:result})
		}else{
			res.status(404).json({message:`No Move Request Items with ID = ${moveRequestID} found`})
		}
	}catch(error){
		res.status(500).json({message:"Internal Server error", error:error.message})
	}
}

const createMoveRequestItem = async (req, res) => {
    const { MoveRequestID, ItemDescription, Height, Width, Depth, Weight, Quantity, SpecialInstructions} = req.body
    try {
        const result = await MoveRequestItem.create({ MoveRequestID, ItemDescription, 
            Height, Width, Depth, Weight, Quantity, SpecialInstructions})
        if (result) {
            res.status(201).json({ message: "Move Request Item Created Successfully", moveRequestItem: result })
        }
        else {
            res.status(500).json({ message: "Failed to create Move Request Item" })
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message })
    }
}

const updateMoveRequestItem = async (req, res) => {
    const { MoveRequestID, ItemDescription, Height, Width, Depth, Weight, Quantity, SpecialInstructions } = req.body;
    const requestItemID = req.query.uuid;
    
    // Check if any of the fields are missing
   // if (!MoveRequestID && !ItemDescription && !Height && !Width && !Depth && !Weight && !Quantity && !SpecialInstructions) {
    //    return res.status(400).json({ message: 'No fields to update' });
   // }

    try {
        const updateValues = { MoveRequestID, ItemDescription, Height, Width, Depth, Weight, Quantity, SpecialInstructions };

        const [affectedRows, updatedRows] = await MoveRequestItem.update(updateValues, { where: { uuid: requestItemID },returning: true });

        if (affectedRows > 0) {
            res.status(200).json({ message: 'Move Request Item updated successfully', moveRequestItem: updatedRows[0]});
        } else {
            res.status(404).json({ message: 'Move Request Item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


const deleteMoveRequestItem = async (req, res) => {
    const requestItemID = req.query.uuid
    if (!requestItemID)
        return res.status(400).json({ message: 'No Move Request Item given' })
    try {
        const result = await MoveRequestItem.destroy({ where: { uuid: requestItemID } })
        if (result) {
            res.status(200).json({ message: 'Move Request Item deleted successfully' })
        } else {
            res.status(404).json({ message: `No Move Request Item with ID = ${requestItemID} found` })
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error: error.message })
    }
}
function calculateVolume(item){
    return item.height * item.depth * item.width;
    }

    const allPermutationsOfItem = (item)=>{
        return [
    
            {height: item.height, width: item.width, depth: item.depth},
    
            {height: item.height, width: item.depth, depth: item.width},
    
            {height: item.width, width: item.height, depth: item.depth},
    
            {height: item.width, width: item.depth, depth: item.height},
    
            {height: item.depth, width: item.height, depth: item.width},
    
            {height: item.depth, width: item.width, depth: item.height}
    
        ]
    }

module.exports = {
    getMoveRequestItem,
    createMoveRequestItem,
    updateMoveRequestItem,
    deleteMoveRequestItem,
	getMoveRequestItems,
    calculateVolume,
    allPermutationsOfItem
}