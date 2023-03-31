
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export const confirmDelete = async () => {
    return  await Swal.fire({
        title: 'Delete',
        text: "Are you sure from delete ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    });
};
