import { approveEmployeeRequest, getNotifications, rejectEmployeeRequest } from "../models/notification.model.js";


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
        const employee = await approveEmployeeRequest(notificationId,adminId);
        // req.io
        //     .to(`employee-${employee.employee_profile_id}`)
        //     .emit("employeeApproved", {
        //         employee
        //     });
        return res.status(200).json({
            success: true,
            message: "Employee Approved Successfully",
            employee
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

        const employee = await rejectEmployeeRequest(
            notificationId,
            adminId
        );
        // req.io
        //     .to(`employee-${employee.employee_profile_id}`)
        //     .emit("employeeRejected", {
        //         employee
        //     });

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