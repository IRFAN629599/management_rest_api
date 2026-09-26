const API_URL =
    'http://localhost:3000/api/siswa';


const form =
    document.getElementById('studentForm');

const studentTable =
    document.getElementById('studentTable');

const loading =
    document.getElementById('loading');

const message =
    document.getElementById('message');

const refreshBtn =
    document.getElementById('refreshBtn');

const cancelBtn =
    document.getElementById('cancelBtn');

const formTitle =
    document.getElementById('formTitle');



async function getStudents() {

    loading.hidden = false;

    studentTable.innerHTML = '';

    try {

        const response =
            await fetch(API_URL);

        const result =
            await response.json();

        if (!response.ok || result.status === false) {
            throw new Error(
                result.message ||
                'Gagal mengambil data siswa'
            );
        }

        renderStudents(result.data);

    } catch (error) {

        showMessage(
            error.message,
            'error'
        );

    } finally {

        loading.hidden = true;
    }
}



function renderStudents(students) {

    if (students.length === 0) {

        studentTable.innerHTML = `
            <tr>
                <td colspan="7">
                    Belum ada data siswa
                </td>
            </tr>
        `;

        return;
    }


    studentTable.innerHTML =
        students.map(student => `

            <tr>

                <td>${student.id}</td>

                <td>${student.nis}</td>

                <td>${student.nama}</td>

                <td>${student.kelas}</td>

                <td>${student.jurusan}</td>

                <td>${student.alamat}</td>

                <td>

                    <button
                        class="edit"
                        onclick="editStudent(${student.id})"
                    >
                        Edit
                    </button>

                    <button
                        class="delete"
                        onclick="deleteStudent(${student.id})"
                    >
                        Hapus
                    </button>

                </td>

            </tr>

        `).join('');
}



form.addEventListener(
    'submit',
    async function(event) {

        event.preventDefault();


        const id =
            document.getElementById(
                'studentId'
            ).value;

        const data = {

            nis:
                document.getElementById(
                    'nis'
                ).value.trim(),

            nama:
                document.getElementById(
                    'nama'
                ).value.trim(),

            kelas:
                document.getElementById(
                    'kelas'
                ).value.trim(),

            jurusan:
                document.getElementById(
                    'jurusan'
                ).value.trim(),

            alamat:
                document.getElementById(
                    'alamat'
                ).value.trim()
        };


        try {

            const response =
                await fetch(
                    id
                        ? `${API_URL}/${id}`
                        : API_URL,
                    {
                        method:
                            id
                                ? 'PUT'
                                : 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const result =
                await response.json();


            if (
                !response.ok ||
                result.status === false
            ) {

                throw new Error(
                    result.message ||
                    'Request gagal'
                );
            }


            showMessage(
                result.message,
                'success'
            );


            resetForm();

            await getStudents();


        } catch (error) {

            showMessage(
                error.message,
                'error'
            );
        }
    }
);



async function editStudent(id) {

    try {

        const response =
            await fetch(
                `${API_URL}/${id}`
            );

        const result =
            await response.json();


        if (
            !response.ok ||
            result.status === false
        ) {

            throw new Error(
                result.message
            );
        }


        const student =
            result.data;


        document.getElementById(
            'studentId'
        ).value = student.id;


        document.getElementById(
            'nis'
        ).value = student.nis;


        document.getElementById(
            'nama'
        ).value = student.nama;


        document.getElementById(
            'kelas'
        ).value = student.kelas;


        document.getElementById(
            'jurusan'
        ).value = student.jurusan;


        document.getElementById(
            'alamat'
        ).value = student.alamat;


        formTitle.textContent =
            'Edit Siswa';


        cancelBtn.hidden = false;


        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });


    } catch (error) {

        showMessage(
            error.message,
            'error'
        );
    }
}



async function deleteStudent(id) {

    const yakin =
        confirm(
            'Yakin ingin menghapus siswa ini?'
        );


    if (!yakin) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/${id}`,
                {
                    method: 'DELETE'
                }
            );


        const result =
            await response.json();


        if (
            !response.ok ||
            result.status === false
        ) {

            throw new Error(
                result.message ||
                'Gagal menghapus siswa'
            );
        }


        showMessage(
            result.message,
            'success'
        );


        await getStudents();


    } catch (error) {

        showMessage(
            error.message,
            'error'
        );
    }
}



function resetForm() {

    form.reset();

    document.getElementById(
        'studentId'
    ).value = '';

    formTitle.textContent =
        'Tambah Siswa';

    cancelBtn.hidden = true;
}



cancelBtn.addEventListener(
    'click',
    resetForm
);


refreshBtn.addEventListener(
    'click',
    getStudents
);



function showMessage(
    text,
    type
) {

    message.innerHTML = `
        <div class="${type}">
            ${text}
        </div>
    `;


    setTimeout(() => {

        message.innerHTML = '';

    }, 3000);
}



getStudents();
// Frontend terintegrasi dengan REST API Student Management
