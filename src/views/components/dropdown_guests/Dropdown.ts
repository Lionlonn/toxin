// const plural = require('plural-ru');
import plural from 'plural-ru'

const MAX_VALUE = 5;
const MIN_VALUE = 0;

const DECREMENT_SELECTOR = '[data-action="minus"]';
const INCREMENT_SELECTOR = '[data-action="plus"]';
const COUNTERS_SELECTOR = '[data-type]';




// dropdown constants
const DROPDOwN_CONTENT_SELECTOR = '.dropdown__content';
const DROPDOWN_GUESTS_ID = '#dropdown-guests';
const DROPDOWN_CONVENIENCES_ID = '#dropdown-conveniences';
const DROPDOWN_LIST_SELECTOR = '.dropdown__list';
const DROPDOWN_LIST_ITEM_SELECTOR = '.dropdown__list-item';
const DROPDOWN_LIST_VISIBLE_SELECTOR = 'dropdown__list--visible';
const DROPDOWN_CONTENT_ANIMATION_ARROW = 'animation-arrow';


//Buttons constants
const BUTTONS_CLEAR_SELECTOR = '.button-clear';
const BUTTONS_APPLY_SELECTOR = '.button-apply';
const BUTTONS_VISIBLE_SELECTOR = 'button-clear--visible';


function pluralValue(count: number, values: string[]): string {
    const [value1, value2, value3] = values;

    return plural(count, `%d ${value1}`, `%d ${value2}`, `%d ${value3}`);
}

type DropdownFields = Record<string, {
    // label: string;
    // value: string;
    count: number;
    separated_values?: string | string[];
}>;
interface DropdownOptions {
    shared_value?: string | string[];
    separated_values?: string | string[];
    dropdownSelector: string;
    dropdownListSelector: string;
    fields: DropdownFields;
    buttonsClearSelector: string;
}

interface DropdownProps {
    shared_value?: string | string[];
    separated_values?: string | string[];
    fields: DropdownFields;
}



class Dropdown {
    private field: HTMLDivElement | null;
    private fildListener: HTMLElement | null;
    private props: DropdownProps;
    private options: DropdownOptions;
    private dicrements: HTMLElement[] = [];
    private increments: HTMLElement[] = [];
    private counters: HTMLElement[] = [];
    private totalCount: number = 0;
    private currentValue: number | undefined;
    private isOpen: boolean = false;
    private dropdownElement: HTMLElement | null | undefined;
    private dropdownListElement: HTMLElement | null | undefined;
    private buttonsClearElement: HTMLElement | null | undefined;
    private str: string | undefined;
    
    constructor(options: DropdownOptions) {
        
        this.field = document.querySelector(options.dropdownSelector);
        console.log(this.field);
        
        
        this.fildListener = document.querySelector(options.dropdownListSelector);
        const dropdownEntries = Object.entries(options.fields).map(dropdownArray => {
            const [key, value] = dropdownArray;
            return [key, { ...value, count: 0 }];
        });
        this.props = {
            shared_value: options.shared_value,
            fields: { ...Object.fromEntries(dropdownEntries) }
        };
        
        this.options = options;
        this.dicrements = [];
        this.increments = [];
        this.counters = [];
        this.totalCount = 0;
        this.isOpen = false;
        this.init();

    }

    init() {
        this.setDropdown();
        this.dropEvent();
        this.clickOutside();
        this.close();
        this.setControls();
        this.attachControlListeners();
        this.applyButtons();
        this.clearButtonsClick();
        // this.clearDropdown();
        this.countersControls();

    }
    //берет дропдаун и лист и каунт
    setDropdown() {
        this.dropdownElement = document.querySelector<HTMLElement>(this.options.dropdownSelector);
        this.dropdownListElement = document.querySelector<HTMLElement>(this.options.dropdownListSelector);
        //buttons
        this.buttonsClearElement = document.querySelector<HTMLElement>(this.options.buttonsClearSelector);
        

    }
    // Добавление события
    dropEvent() {
        this.dropdownElement?.addEventListener('click', this.toggle.bind(this));
        this.dropdownListElement?.addEventListener('click', (event: MouseEvent) => this.handelChangeCounter.bind(this));

    }
    //открытие дропдауна
    toggle(event: MouseEvent) {

        event.stopPropagation();
        this.isOpen = !this.isOpen;
        this.dropdownListElement?.classList.toggle(DROPDOWN_LIST_VISIBLE_SELECTOR, this.isOpen);
        this.dropdownElement?.classList.toggle(DROPDOWN_CONTENT_ANIMATION_ARROW);
        this.dropdownListElement?.addEventListener('click', (event) => {
            event.stopPropagation();
        });

    }

    // закрытие дропдауна
    close() {
        this.isOpen = false;
        this.dropdownListElement?.classList.remove(DROPDOWN_LIST_VISIBLE_SELECTOR);
    }
    //клик снаружи дропдауна
    clickOutside() {
        document.addEventListener('click', (event: MouseEvent) => {
            const isInsideDropdown = this.dropdownListElement?.contains(event.target as HTMLElement);
            const isDropdownClicked = event.target === this.dropdownElement;
            const isDropdownListClicked = event.target === this.dropdownListElement;
            const shouldCloseDropdown = !isInsideDropdown && !isDropdownClicked && !isDropdownListClicked;

            if (shouldCloseDropdown) {
                this.close();
            }
        });
    }
    //получаем все плюсы, минусы,
    setControls() {
        this.dicrements = Array.from(this.fildListener?.querySelectorAll(DECREMENT_SELECTOR) ?? [])
        this.increments = Array.from(this.fildListener?.querySelectorAll(INCREMENT_SELECTOR) ?? []);
        this.counters = Array.from(this.dropdownListElement?.querySelectorAll(COUNTERS_SELECTOR) ?? []);
    }
    //меняем текст поля
    changeFieldContent(type: string) {

        const field = this.props.fields[type];
        
        const { shared_value } = this.props;
        const { separated_values } = this.props;
        
        const separated_elements = Object.values(this.props.fields).filter((field) => field.separated_values);
        
        


        const separated_text = separated_elements.map((element) => element.count > 0 && Array.isArray(element.separated_values) ? pluralValue(element.count, element.separated_values) : '').join(' ');
        
        
        const text = `${shared_value && Array.isArray(shared_value) ? pluralValue(this.totalCount, shared_value) : ''} ${separated_text}`;
        
        


        const textField = this.field?.dataset.text;
        this.str = this.field?.textContent as string;

        if (this.field !== null) {
            this.field.innerText = this.totalCount > 0 ? text : textField as string;
        }

        //Ограничение символов
        if (this.str.length > 22 && this.field !== null) {
            this.field.textContent = this.str.slice(0, 21) + '...';
        }
    }



    handelChangeCounter(delta: number) {
        return (event: MouseEvent) => {
            // if(event.target) {

            // }
            const parent = (event.target as Element).closest(DROPDOWN_LIST_ITEM_SELECTOR);
            const decrement = parent?.querySelector(DECREMENT_SELECTOR);
            const increment = parent?.querySelector(INCREMENT_SELECTOR);
            if (decrement)
                this.enableElement(decrement);
            if (increment)
                this.enableElement(increment);

            //текущий каунтер и значение
            const currentCounter = parent?.querySelector(COUNTERS_SELECTOR) as HTMLElement;
            this.currentValue = Number(currentCounter.innerText);
            const type = currentCounter.dataset.type;

            if (typeof type === 'string') {
                if (this.props.fields[type] && (delta > 0 && this.currentValue < MAX_VALUE || delta < 0 && this.currentValue !== MIN_VALUE)) {
                    this.props.fields[type].count += delta;
                    this.totalCount += delta;
                    currentCounter.innerText = this.props.fields[type].count.toString();
                    this.changeFieldContent(type);
                    this.clearButtonsVisible();
                    if (delta !== 0) {
                        this.currentValue = Number(currentCounter.innerText);
                    }
                    this.countersControls();
                }
            }
            //решаем прибавлять или убавлять значение

        };
    }

    countersControls() {
        this.dicrements.forEach(dicrem => {
            const currentCounter = dicrem.nextElementSibling as HTMLElement;
            const type = currentCounter.dataset.type;
            if (typeof type === 'string') {
                if (this.props.fields[type].count === MIN_VALUE) {
                    this.disableElement(dicrem);
                } else {
                    this.enableElement(dicrem);
                }

                const increment = dicrem.nextElementSibling?.nextElementSibling;
                if (this.props.fields[type].count === MAX_VALUE) {
                    if (increment)
                        this.disableElement(increment);
                } else {
                    if (increment)
                        this.enableElement(increment);
                }
            }
        });

    }

    disableElement(element: Element) {
        if (element) {
            element.classList.add('disabled');
        }
    }
    enableElement(element: Element) {
        if (element) {
            element.classList.remove('disabled');
        }
    }



    attachControlListeners() {
        this.increments.forEach((increment) => increment.addEventListener('click', this.handelChangeCounter(1).bind(this)));
        this.dicrements.forEach((dicrement) => dicrement.addEventListener('click', this.handelChangeCounter(-1).bind(this)));

    }


    //BUTONS
    applyButtons() {
        const applyBtns = document.querySelectorAll(BUTTONS_APPLY_SELECTOR);
        applyBtns.forEach((applyRemoveVisible) => {
            applyRemoveVisible.addEventListener('click', () => {
                this.close();
            });
        });
    }
    clearButtonsVisible() {
        if (this.totalCount > MIN_VALUE) {
            this.buttonsClearElement?.classList.add(BUTTONS_VISIBLE_SELECTOR);
        } else {
            this.buttonsClearElement?.classList.remove(BUTTONS_VISIBLE_SELECTOR);
        }
    }
    clearButtonsClick() {
        this.buttonsClearElement?.addEventListener('click', this.clearDropdown.bind(this));
    }
    clearDropdown() {
        Object.values(this.props.fields).forEach((clearField) => {
            clearField.count = 0;
        });
        if (this.field)
            this.field.innerHTML = 'Сколько гостей';
        this.currentValue = 0;
        // this.counters.innerHTML = 0;
        this.counters.forEach((element: HTMLElement) => {
            element.innerHTML = '0';
        })
        this.counters.forEach(DropdownsCounters => {
            DropdownsCounters.innerHTML = '0';
        });
        this.totalCount = 0;
        this.countersControls();
        this.clearButtonsClick();
        this.clearButtonsVisible();
        // this.changeFieldContent();
    }

}






export default Dropdown;