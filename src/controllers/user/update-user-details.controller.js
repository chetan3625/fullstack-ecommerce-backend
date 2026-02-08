const express=require('express');
const User=require('../../models/user.model');

async function updateUserDetails(req,res){
    try{
        const {id}=req.params;
        const allowedUpdates=[
            'userName',
        ];
        const updates={};
        for(let i=0;i<allowedUpdates.length;i++){
            const key=allowedUpdates[i];
            if(req.body[key]){
                updates[key]=req.body[key];

            }

        }
                 if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        message: 'No valid fields provided to update'
      });
    }
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );
     if (!updateUser) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
            return res.status(200).json({
      message: 'User updated successfully',
      user: updateUser
    });


    }catch(e){
        return res.status(500).json({
            message:'Internal server error',
            error:e.message
        });
    }
}
module.exports={updateUserDetails};
