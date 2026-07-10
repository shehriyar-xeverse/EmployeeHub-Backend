import { approveEmployeeRequest, getNotifications, rejectEmployeeRequest } from "../models/notification.model.js";
import { getIO } from "../config/socket.js";



export const getAllNotifications = async (req, res) => {
  try {
    const notification = await getNotifications();
    res.json(notification);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// approved Notifications 
export const approveNotification = async (req, res) => {
    try {
        const  notificationId  = req.body.id;
        const adminId = req.user.id;
        const result = await approveEmployeeRequest(notificationId, adminId);



        const io = getIO();
        io.emit("approveNotif",  result);
       
        return res.status(200).json({
            success: true,
            message: "Employee Approved Successfully",
            result
          });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message

        });

    }

};


// reject Notifications 
export const rejectNotification = async (req, res) => {
    try {
        const  notificationId  = req.body.id;
        const adminId = req.user.id;

        const result = await rejectEmployeeRequest(
            notificationId,
            adminId
        );
        
         const io = getIO();
        io.emit("rejectNotif",  result);


        return res.status(200).json({
            success: true,
            message: "Employee Request Rejected Successfully"
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};