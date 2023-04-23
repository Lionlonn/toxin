import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

const INPUT_DATEPICKER_BITHD = '#inputBirth';
const DATEPICKER_WRAPPER_BITHD = '.input-wrapper__bithd';
const DATEPICKER_WRAPPER_BITHD_OPENED = 'wrapper__bithd__opened';

class DatepickerInput {
    constructor() {
        this.init();
    }
    init() {
        this.setControls();
        this.openDatepicker();
        this.datepickerOptions();
        this.handleDocumentClick();
    }

    setControls() {
        this.fieldDatepicker = document.querySelector(INPUT_DATEPICKER_BITHD);
        this.datepickerWrapper = document.querySelector(DATEPICKER_WRAPPER_BITHD);
    }

    openDatepicker() {
        this.fieldDatepicker.addEventListener('click', () => {
            this.datepickerWrapper.classList.toggle(DATEPICKER_WRAPPER_BITHD_OPENED);
        });
    }

    handleDocumentClick() {
        document.addEventListener('click', (event) => {
            const target = event.target;
            if (!this.datepickerWrapper.contains(target) && !this.fieldDatepicker.contains(target)) {
                this.datepickerWrapper.classList.remove(DATEPICKER_WRAPPER_BITHD_OPENED);
            }
        });
    }

    datepickerOptions() {
        const inputFieldBithd = new AirDatepicker(DATEPICKER_WRAPPER_BITHD, {
            autoClose: true,
            buttons: [{
                content: "Применить",
                onClick: () => {
                    this.datepickerWrapper.classList.remove(DATEPICKER_WRAPPER_BITHD_OPENED);
                },
            }],

            onSelect: (date) => {
                const { formattedDate } = date;
                const fieldId = document.querySelector(INPUT_DATEPICKER_BITHD);
                fieldId.value = formattedDate;
            }
        });
    }
}

const datepickerInput = new DatepickerInput();