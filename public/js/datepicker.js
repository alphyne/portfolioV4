$(document).ready(function(){

    // Get today's date values
    let today = new Date();
    let todayDay = today.getDate();
    let todayMonth = today.getMonth();
    let todayYear = today.getFullYear();

    /* Set current date values to today
     * Holds int values for date
     */
    let currDay = todayDay;
    let currMonth = todayMonth;
    let currYear = todayYear;

    /* Initialize selected date variables
     * Holds int values for selected date
     */
    let selectedDay = 0;
    let selectedMonth;
    let selectedYear;

    /* Initialize variables for text parsing
     * Holds string values for selected date
     */
    let textMonth = 0;
    let textDay = 0;
    let textYear = 0;

    // Calendar month array for populating widget
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

    let monthIndex; // Keeps track of calendar index for months[]

    // Get input field & widget elements
    let textField = document.getElementsByClassName('pa-datepickerInput');
    let datepicker = document.getElementsByClassName('pa-datepicker');
    let formUnit = document.getElementsByClassName('pa-formUnit');
    let errorMessage = document.getElementsByClassName('pa-fieldError');

    // If field is clicked, show calendar
    textField[0].addEventListener('click', showCalendar);
    //textField[0].addEventListener('click', convertDateToNum);

    // If lose focus on <input>, submit date
    textField[0].addEventListener('change', submitTypedDate);

    // Close calendar is user clicks off widget
    document.addEventListener("click", function(event) {

        // If user clicks off datepicker, return
        if (event.target.closest(".pa-datepicker")) return;
        closeCalendarQuick();
    });

    // Handle typed input as selected date
    $('.pa-datepickerInput').on('keyup', function(e){

        /* SEMANTIC MONTH PARSING */
        //convertDateToNum();

        if( e.keyCode === 8){
            backspaceDate();
        }
        else if( e.keyCode === 13){
            console.log('enter registered');
            submitTypedDate();
        }
        else {
            typeDate();
        }
    });

    // Set onclick events to handle month/year navigation
    let nextMonthButton = document.getElementsByClassName('pa-nextPage');
    let prevMonthButton = document.getElementsByClassName('pa-prevPage');
    let yearSelect = document.getElementsByClassName('pa-yearSelect');
    nextMonthButton[0].onclick = function () { nextMonth(); }
    prevMonthButton[0].onclick = function() { prevMonth(); }
    yearSelect[0].onchange = function() { changeYear(); }

    // Fill calendar with current month
    populateCalendar(currMonth, currYear);

    /********************************************************************
     *  Functions that handle rendering/navigating the calendar widget  *
     ********************************************************************/

     
    /*
     * populateCalendar function updates and fills the calendar
     * with the appropriate dates. It also handles events where
     * the month or year is changed
     */
    function populateCalendar(month, year) {

        let startOfMonth = new Date(year, month).getDay();
        let currMonthDays = daysInMonth(month, year);
        let renderNum = 1;
        let disabledNextNum = 1;
        

        // Calculate days in previous month
        prevMonthMonth = (currMonth === 0) ? 11 : currMonth - 1;
        prevMonthYear = (currMonth === 0) ? currYear - 1 : currYear;
        let prevMonthDays = daysInMonth(prevMonthMonth, prevMonthYear);
        let disabledPrevNum = prevMonthDays - startOfMonth + 1;

        // Get table elements
        let tableBody = document.getElementsByClassName('pa-tableBody');
        let calendarMonth = document.getElementsByClassName('pa-monthLabel');
        let calendarYear = document.getElementsByClassName('pa-yearSelect');

        // Clear table body and calendar month
        tableBody[0].innerHTML = '';
        calendarMonth[0].innerHTML = '';

        // Set calendar month
        calendarMonth[0].innerHTML = months[currMonth];
        calendarYear[0].value = currYear;

        // Populate table with calendar days
        for(i = 0; i < 6; i++) {
            let row = document.createElement('tr');
            for(j = 0; j < 7; j++) {

                //Fill in disabled days for prev month
                if(i===0 && j < startOfMonth) {
                    let td = document.createElement('td');
                    let gridCell = document.createElement('span');
                    let disabledCell = document.createElement('div');
                    
                    gridCell.textContent = disabledPrevNum;
                    
                    disabledCell.classList.add('pa-disabled');
                    disabledCell.append(gridCell);

                    td.append(disabledCell);
                    row.append(td);

                    disabledPrevNum++;
                } 
                
                // Fill in disabled days for next month 
                else if (renderNum > currMonthDays) {

                        let td = document.createElement('td');
                        let gridCell = document.createElement('span');
                        let disabledCell = document.createElement('div');
                        
                        gridCell.textContent = disabledNextNum;

                        disabledCell.classList.add('pa-disabled');
                        disabledCell.append(gridCell);

                        td.append(disabledCell);
                        row.append(td);

                        disabledNextNum++;
                } 
                
                // Fill in calendar days
                else {
                    let td = document.createElement('td');

                    let gridCell = document.createElement('span');
                    gridCell.classList.add('pa-gridCell');
                    gridCell.textContent = renderNum;

                    let gridCellBorder = document.createElement('div');
                    gridCellBorder.classList.add('pa-gridCellBorder');
                    gridCellBorder.setAttribute('value', renderNum);
                    gridCellBorder.setAttribute('id', renderNum);
                    gridCellBorder.addEventListener('click', selectDate);

                    // If 'Today' add pa-today class
                    if( isToday(renderNum, currMonth, currYear)) {
                        gridCellBorder.classList.add('pa-todayFont');
                        gridCell.classList.add('pa-todayBorder');
                    }

                    // If selected date is in calendar view, apply CSS styles
                    if(renderNum === selectedDay && currMonth === selectedMonth
                        && currYear === selectedYear){
                            
                        if ( isToday(selectedDay, currMonth, currYear) ){
                            gridCellBorder.classList.add('pa-todayFontSelected');
                        }
                        gridCellBorder.classList.add('pa-gridCellSelected');
                    }

                    gridCellBorder.append(gridCell);
                    td.append(gridCellBorder);
                    row.append(td);
                    renderNum++;
                }
            }
            tableBody[0].append(row);
            if(renderNum > currMonthDays) {
                break;
            }
        }

        // If Jan 2018, disable previous button
        if( currYear === 2018 && currMonth === 0 ){
            prevMonthButton[0].setAttribute('disabled', '');
        }
        else {
            prevMonthButton[0].removeAttribute('disabled');
        }

        // If Dec 2022, disable next button
        if( currYear === 2022 && currMonth === 11 ){
            nextMonthButton[0].setAttribute('disabled', '');
        }
        else {
            nextMonthButton[0].removeAttribute('disabled');
        }
    };

    // Helper function: Calculate number of days in a month
    function daysInMonth(month, year) {
        return new Date(year, month + 1, 0).getDate();
    };

    // Helper function: View next month
    function nextMonth() {
        currYear = (currMonth === 11) ? currYear + 1 : currYear;
        currMonth = (currMonth + 1) % 12;

        populateCalendar(currMonth, currYear);
    }

    // Helper function: View previous month
    function prevMonth() {
        currYear = (currMonth === 0) ? currYear - 1 : currYear;
        currMonth = (currMonth === 0) ? 11 : currMonth - 1;

        populateCalendar(currMonth, currYear);
    };

    // Helper function: Jump to selected year
    function changeYear() {
        currYear = parseInt(yearSelect[0].value);
        populateCalendar(currMonth, currYear);
    }

    // Helper function: Change calendar view
    function jumpCalendar() {
        populateCalendar(currMonth, currYear);
    }


    // Helper function: Determine if date is 'Today'
    function isToday(day, month, year) {

        if(day === todayDay && month === todayMonth
            && year ===todayYear){
                return true;
            }
        return false;
    }

    // Helper function: Show calendar
    function showCalendar() {
        formUnit[0].classList.remove('pa-hasError');
        datepicker[0].classList.add('pa-active');
        populateCalendar(currMonth, currYear);
    }

    // Helper function: Close calendar with delay for selected date - default
    function closeCalendar() {
        setTimeout(function() { datepicker[0].classList.remove('pa-active')}, 300);
    }

    // Helper function: Close calendar w/o delay - error & click-off widget
    function closeCalendarQuick() {
        datepicker[0].classList.remove('pa-active');
    }


    /**************************************************
     *  Functions that handle date inputs/validation  *
     **************************************************/

    /*
     * typeDate handles user input and checks if date entered is valid. 
     * The calendar view is updated accordingly if date is valid.
     */
    function typeDate() {
        console.log('typeDate init');

        let dateString = textField[0].value;

        // Add dashes as user types out date
        if ( dateString.length === 2 ){
            dateString = dateString + '-';
            textField[0].value = dateString;
        } 

        else if( dateString.length === 5 ){
            dateString = dateString + '-';
            textField[0].value = dateString;
        }

        // Check if full length date is entered
        if (dateString.length >= 6 && dateString.length <= 10){

            let endOfString = dateString.substring(dateString.indexOf('-', 3) + 1);

            // When typing out date, ignore format error until year is typed
            if (dateString.length === 6) {
                
                if(endOfString === ''){
                    return;
                }
            }
            else if (dateString.length === 7) {

                if(endOfString.length === 1){
                    return;
                }
            }
            else if (dateString.length === 9) {

                if(endOfString.length === 3){
                    return;
                }
            }

            if( !(parseDateToString(dateString)) ){
                invalidDateInput();
                return;
            };

            // If date valid, update calendar view
            if ( isDateValid() ){
                currMonth = parseInt(textMonth, 10) - 1;
                currYear = parseInt(textYear, 10);
                currDay = parseInt(textDay, 10);
                populateCalendar(currMonth, currYear);
                
                let focusDay = document.getElementById(currDay);
                focusDay.classList.add('pa-gridCellBorderFocus')
            }
            else {
                invalidDateInput();
                return;
            }
        }
    };

    /*
     * submitTypedDate handles a date input through text field
     * Inputs are parsed and the calendar is updated to reflect selected dates.
     * Invalid date format throws error.
     */
    function submitTypedDate() {

        console.log('submitTypedDate init')

        // If date has been selected before, remove selected classes
        if( selectedDay !== 0 && currMonth === selectedMonth && currYear === selectedYear ){
            let prevSelected = document.getElementsByClassName('pa-gridCellSelected');
            prevSelected[0].classList.remove('pa-todayFontSelected');
            prevSelected[0].classList.remove('pa-gridCellSelected');  
        }

        let dateString = textField[0].value;

        // If field is cleared, return
        if (dateString === '') {
            selectedDay = 0;
            selectedMonth = 0;
            selectedYear = 0;
            closeCalendar();
            return;
        }

        // Convert dateString with slashes to dashes
        if ( dateString.includes('/') ){
            dateString = convertSlashesToDashes(dateString);

            if( dateString === false ){
                invalidDateInput();
                return;
            }
        };

        // If date is in correct format continue, otherwise return
        if( !parseDateToString(dateString) ){
            invalidDateInput();
            return;
        };

        // If date is valid continue, otherwise return
        if ( !isDateValid() ){
            invalidDateInput();
            return;
        }

        // Update selected date values with integers
        monthValue = parseInt(textMonth, 10);
        monthIndex = monthValue - 1;

        dayValue = parseInt(textDay, 10);
        dayId = dayValue;

        yearValue = parseInt(textYear, 10);

        selectedMonth = monthIndex;
        selectedDay = dayValue;
        selectedYear = yearValue;

        //  Semantic month - Update text input field - NOT IN USE
        /*let semanticMonth = months_abr[selectedMonth];
        textField[0].value = semanticMonth + '-' + selectedDay + '-' + selectedYear;*/

        // Update and format dateString in form field 
        textField[0].value = '';
        dateString = (selectedMonth + 1) + '-' + selectedDay + '-' + selectedYear;
        textField[0].value = formatDate(dateString);

        if( textField[0].value === false){
            invalidDateInput();
            return;
        }

        // Update curr date variables
        currMonth = selectedMonth;
        currYear = selectedYear;
        currDay = selectedDay;

        // Move calendar view to selected date and close
        jumpCalendar();
        closeCalendar();
    };


    /*
     * selectDate is called when a user selects a date using the 
     * calendar widget. selectDate extracts selectedDate values
     * using the current state of the calendar.
     */
    function selectDate() {

        // If date has been selected before, remove selected classes
        if( selectedDay !== 0 && currMonth === selectedMonth && currYear === selectedYear ){
            let prevSelected = document.getElementsByClassName('pa-gridCellSelected');
            prevSelected[0].classList.remove('pa-todayFontSelected');
            prevSelected[0].classList.remove('pa-gridCellSelected');  
            
        }
        
        // Update selected date variables
        selectedDay = $(this)[0].id;
        selectedDay = parseInt(selectedDay, 10);
        selectedMonth = currMonth;
        selectedYear = currYear;
        selectedGridCell = $(this)[0];

        // Apply apprpriate CSS for selected day
        if ( isToday(selectedDay, currMonth, currYear) ){

            selectedGridCell.classList.add('pa-todayFontSelected');
        }
        selectedGridCell.classList.add('pa-gridCellSelected');

        // **SEMANTIC** Update text input field
        /*textField[0].value = '';
        let semanticMonth = months_abr[selectedMonth];
        textField[0].value = (semanticMonth + '-' + selectedDay + '-' + selectedYear);*/

        // Update and format dateString in form field
        textField[0].value = '';
        dateString = (selectedMonth + 1) + '-' + selectedDay + '-' + selectedYear;
        textField[0].value = formatDate(dateString);

        if( textField[0].value === false){
            invalidDateInput();
            return;
        }

        // Update text variables
        textDay = selectedDay.toString();
        textMonth = (selectedMonth + 1).toString();
        textYear = selectedYear.toString();

        // Close calendar widget
        closeCalendar();
    };

    /* parseDateToString converts dateString from string format 
     * mm-dd-yyy to separated values
     * If proper format return true, otherwise return false
     */
    function parseDateToString(dateString) {

        console.log('parseDateToString init')

        // Get month value
        textMonth = dateString.substring(0, dateString.indexOf('-'));

        // Semantic month parsing - NOT IN USE
        /*if (textMonth.length === 3){
            for(let i = 0; i < months_abr.length; i++){
                if( textMonth === months_abr[i]){
                    dateString = dateString.replace(textMonth, (i+1).toString());
                    textMonth = (i+1).toString();
                    console.log(dateString)
                }
            }
        };*/

        // Get day value
        if( textMonth.length === 1) {
            textDay = dateString.substring(2, dateString.indexOf('-', 2));
        } 
        else if (textMonth.length === 2) {
            textDay = dateString.substring(3, dateString.indexOf('-',3));
        }
        else {
            console.log('month invalid')
            errorMessage[0].innerHTML = 'Invalid date. Please enter in format mm-dd-yyyy.';
            return false;
        }

        // Get year value
        if ( textMonth.length === 1 && textDay.length === 1 ){
            textYear = dateString.substring(dateString.indexOf('-', 3) + 1);
        }
        else if ( (textMonth.length === 2 && textDay.length === 1 )
            || (textMonth.length === 1) && textDay.length === 2 ){
            
            textYear = dateString.substring(dateString.indexOf('-', 4) + 1);
        }
        else if ( textMonth.length === 2 && textDay.length === 2 ) {

            textYear = dateString.substring(dateString.indexOf('-', 5) + 1);
        }
        else {
            console.log('day invalid');
            errorMessage[0].innerHTML = 'Invalid date. Please enter in format mm-dd-yyyy.';
            return false;
        }

        // Convert year value to 20XX if only last 2 digits
        if( textYear.length === 2) {
            textYear = '20' + textYear;
        }
        else if ( textYear.length === 4) {
            //console.log('formatted year is ' + textYear);
        }
        else {
            console.log('year invalid')
            errorMessage[0].innerHTML = 'Invalid date. Please enter in format mm-dd-yyyy.';
            return false;
        }
        return true;
    }

    /*
     * isDateValid checks if date is calendar valid
     * Return true if yes, false if no
     */
    function isDateValid() {

        console.log('isDateValid init')

        // Check that dates are valid
        numDay = parseInt(textDay, 10);
        numMonth = parseInt(textMonth, 10);
        numYear = parseInt(textYear, 10);

        let textMonthDays = daysInMonth(numMonth-1, numYear);

        // Check month is between 1 and 12
        if( !(numMonth > 0 && numMonth < 13)) {

            // If user types format X-XX-XXXX, handle invalid input
            if( textMonth[1] === '-'){
                errorMessage[0].innerHTML = 'Invalid date. Date format is mm-dd-yyyy';
                return false;
            }
            errorMessage[0].innerHTML = 'Invalid date.';
            return false;
        } 

        // Check day is between 1 and # of days in month
        else if ( !(numDay > 0 && numDay <= textMonthDays )) {
            errorMessage[0].innerHTML = 'Invalid date.';
            return false;
        }

        // Check year is between 2018 and 2022 *test limits only
        else if ( !(numYear > 2017 && numYear < 2023)) {
            errorMessage[0].innerHTML = 'Invalid date. Please enter year between 2018 and 2022.';
            return false;
        }
        formUnit[0].classList.remove('pa-hasError');
        return true;
    }

    /*
     * invalidDateInput adds the pa-hasError class to the input field.
     * This function is called when an error is thrown when
     * parsing and validating dates.
     */
    function invalidDateInput() {
        console.log('init invalidDateInput');

        // If no date has been selected yet, set error state
        if(selectedDay === 0) {
            formUnit = document.getElementsByClassName('pa-formUnit');
            formUnit[0].classList.add('pa-hasError');
            fieldHelper = document.getElementsByClassName('pa-fieldHelper');
            closeCalendarQuick();
        }

        // Set error state
        else {
            formUnit = document.getElementsByClassName('pa-formUnit');
            formUnit[0].classList.add('pa-hasError');
            closeCalendarQuick();
        }
    }

    // Helper function: When user backspaces, do not call typeInput()
    function backspaceDate() {
        console.log('backspaceDate init');
    };

    // Helper function: converts slash format to dash format for parsing
    function convertSlashesToDashes(dateString) {

        console.log('convertSlashesToDashes init');

        // Get month value
        let convertMonth = dateString.substring(0, dateString.indexOf('/'));

        // Get day value
        if( convertMonth.length === 1) {
            convertDay = dateString.substring(2, dateString.indexOf('/', 2));
        } 
        else if (convertMonth.length === 2) {
            convertDay = dateString.substring(3, dateString.indexOf('/',3));
        }
        else {
            return false;
        }

        // Get year value
        if ( convertMonth.length === 1 && convertDay.length === 1 ){

            convertYear = dateString.substring(dateString.indexOf('/', 3) + 1);
        }
        else if ( (convertMonth.length === 2 && convertDay.length === 1 )
            || (convertMonth.length === 1) && convertDay.length === 2 ){
            
                convertYear = dateString.substring(dateString.indexOf('/', 4) + 1);
        }
        else if ( convertMonth.length === 2 && convertDay.length === 2 ) {

            convertYear = dateString.substring(dateString.indexOf('/', 5) + 1);
        }
        else {
            return false;
        }

        dateString = convertMonth + '-' + convertDay + '-' + convertYear;
        return dateString;
    };

    /*
     * Helper function: formatDate takes an input dateString and properly formats it to
     * mm-dd-yyyy. If dateString is invalid, return false
     */
    function formatDate(dateString) {

        console.log('formatDate init');

        // Get month value
        let convertMonth = dateString.substring(0, dateString.indexOf('-'));

        // Get day value
        if( convertMonth.length === 1) {
            convertDay = dateString.substring(2, dateString.indexOf('-', 2));
        } 
        else if (convertMonth.length === 2) {
            convertDay = dateString.substring(3, dateString.indexOf('-',3));
        }
        else {
            return false;
        }

        // Get year value
        if ( convertMonth.length === 1 && convertDay.length === 1 ){
            convertYear = dateString.substring(dateString.indexOf('-', 3) + 1);
        }
        else if ( (convertMonth.length === 2 && convertDay.length === 1 )
            || (convertMonth.length === 1) && convertDay.length === 2 ){
                convertYear = dateString.substring(dateString.indexOf('-', 4) + 1);
        }
        else if ( convertMonth.length === 2 && convertDay.length === 2 ) {
            convertYear = dateString.substring(dateString.indexOf('-', 5) + 1);
        }
        else {
            return false;
        }

        // Format datestring in mm-dd-yyyy
        if ( convertMonth.length === 1 && convertDay.length === 1 ){
            dateString = '0' + convertMonth + '-' + '0' + convertDay + '-' + convertYear;
        }
        else if ( convertMonth.length === 2 && convertDay.length === 1 ){
            dateString = convertMonth + '-' + '0' + convertDay + '-' + convertYear;
        }
        else if (convertMonth.length === 1 && convertDay.length === 2 ){
            dateString = '0' + convertMonth + '-' + + convertDay + '-' + convertYear;
        }
        else if ( convertMonth.length === 2 && convertDay.length === 2 ) {
            dateString = convertMonth + '-' + convertDay + '-' + convertYear;
        }

        return dateString;
    }


    /***** Arrays & functions to handle semantic month date format - NOT CURRENTLY IN USE *****/

    let months_abr = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    // Helper function: parses date from string format mm-dd-yyyy to integers
    function parseDateToInt(value) {

        monthValue = value.substring(0, value.indexOf('-'));
        dayValue = value.substring(3, value.indexOf('-', 3));
        yearValue = value.substring(6);

        monthValue = parseInt(monthValue, 10);
        dayValue = parseInt(dayValue, 10);
        yearValue = parseInt(yearValue, 10);
    }

    // Event handler for editing date
    function convertDateToNum() {

        // If field is empty, return
        if( this.value === ''){
            return;
        };

        let monthLength = this.value.substring(0, this.value.indexOf('-')).length;
        if( monthLength === 3){
            return;
        }

        // Convert semantic date to number date
        if (textDay.length === 1 && textMonth.length === 1){
            this.value = '0' + textMonth + '-' + '0' + textDay + '-' + textYear;
        }
        else if (textMonth.length === 1 && textDay.length === 2) {
            this.value = '0' + textMonth + '-' + textDay + '-' + textYear;
        }
        else if (textDay.length === 1 && textMonth.length === 2){
            this.value = textMonth + '-' + '0' + textDay + '-' + textYear;
        }
        else {
            this.value = textMonth + '-' + textDay + '-' + textYear;
        }
        parseDateToInt(this.value);
    };
});