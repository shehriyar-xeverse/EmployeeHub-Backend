import axios from "axios";

export const sendEmployeeRegistrationEmail = async (employee) => {
    try {
        await axios.post(process.env.N8N_WEBHOOK_URL, {
            employeeId: employee.id,
            employeeName: employee.name,
            employeeEmail: employee.email,
            department: employee.department,
        });
        console.log("Successfully run n8n webhook")
    } catch (error) {
        console.log("failed to  run n8n webhook")
        console.error("n8n webhook failed:", error.message);
    }
};