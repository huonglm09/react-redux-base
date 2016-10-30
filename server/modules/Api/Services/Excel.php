<?php

namespace Api\Services;

use PHPExcel;
use PHPExcel_Cell_DataValidation;

class Excel {

    private $excel;
    private $current_sheet;
    public $template;
    public $pathFile;
    public $data_validation;
    public $cellValues;
    public $arrayConvert;
    private $inputFile;

    public function __construct() {
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->setActiveSheetIndex(0);
        $this->excel = $objPHPExcel;
        $this->loadExcel = $objPHPExcel;
        $this->current_sheet = $objPHPExcel->getActiveSheet();
        $this->arrayConvert = array();
    }

    public function setFile($filename) {
        $this->inputFile = $filename;
    }

    public function loadFile() {
        $sheetData = array();
        $this->excel->setActiveSheetIndex(0);

        $inputFileType = \PHPExcel_IOFactory::identify($this->inputFile);
        $objReader = \PHPExcel_IOFactory::createReader($inputFileType);
        $objReader->setLoadAllSheets();
        $objReader->setReadDataOnly(false);
        $this->excel = $objReader->load($this->inputFile);
        $countSheet = $this->excel->getSheetCount();
        $loadedSheetNames = $this->excel->getSheetNames();

        foreach ($loadedSheetNames as $sheetIndex => $sheetName) {
            $sheetData[$sheetName] = $this->excel->getSheet($sheetIndex)->toArray(null, true, true, true);
        }

        return $sheetData;
    }

    public function loadFileCheckProtection($cp, $user_id) {
        @set_time_limit(7200);
        @flush();
        @ob_flush();
        $sheetData = array();
        $sheetCheckProtect = array();
        $objPHPExcel = new PHPExcel();
        $objPHPExcel->setActiveSheetIndex(0);
        $inputFileType = \PHPExcel_IOFactory::identify($this->inputFile);
        $objReader = \PHPExcel_IOFactory::createReader($inputFileType);
        $objReader->setLoadAllSheets();
        $objPHPExcel = $objReader->load($this->inputFile);

        $countSheet = $objPHPExcel->getSheetCount();
        $loadedSheetNames = $objPHPExcel->getSheetNames();

        //Each sheet to get data        
        foreach ($loadedSheetNames as $sheetIndex => $sheetName) {
            $checkProtection = $objPHPExcel->getSheet($sheetIndex)->getProtection()->isProtectionEnabled();
            if ($checkProtection == true) {
                $checkProtection = $objPHPExcel->getSheet($sheetIndex)->getProtection()->getSelectUnlockedCells();
            }

            $curentSheet = $objPHPExcel->getSheet($sheetIndex);
            $highestRow = $curentSheet->getHighestDataRow();

            $highestColumn = $curentSheet->getHighestDataColumn();
            $fieldByRow = array();
            for ($row = 1; $row <= $highestRow; $row++) {
                $i = 0;
                $fieldByCol = array();
                for ($i = 'A'; $i < $highestColumn; $i++) {
                    if ($curentSheet->getCell($i . $row)->getValue() instanceof \PHPExcel_RichText) {
                        $valueField = $curentSheet->getCell($i . $row)->getValue()->getPlainText();
                    } else {
                        $valueField = $curentSheet->getCell($i . $row)->getValue();
                    }
                    $fieldByCol[$i] = $valueField;
                }
                $fieldByRow[] = $fieldByCol;
            }

            $sheetData[$sheetName] = $fieldByRow;
            $sheetCheckProtect[$sheetName] = $checkProtection;
        }

        return array('sheetData' => $sheetData, 'sheetProtection' => $sheetCheckProtect);
    }

    public function loadEntityFile() {
        $sheetData = array();
        $this->excel->setActiveSheetIndex(0);

        $inputFileType = \PHPExcel_IOFactory::identify($this->inputFile);
        $objReader = \PHPExcel_IOFactory::createReader($inputFileType);
        $objReader->setLoadAllSheets();
        $objReader->setReadDataOnly(false);
        $this->excel = $objReader->load($this->inputFile);
        $countSheet = $this->excel->getSheetCount();
        $loadedSheetNames = $this->excel->getSheetNames();

        foreach ($loadedSheetNames as $sheetIndex => $sheetName) {
            $sheetData[$sheetName] = $this->excel->getSheet($sheetIndex)->toArray(null, true, true, true);
        }

        //---------------- unset array empty ------------
        foreach ($sheetData as $sheetName => $values) {
            foreach ($values as $key => $val) {
                $check = array_values($val);
                $ck = false;
                foreach ($check as $k => $v) {
                    $v = (string) $v;
                    if ($v != null && $v != "") {
                        $ck = true;
                    }
                }
                if ($ck == false) {
                    unset($sheetData[$sheetName][$key]);
                }
            }
        }

        return $sheetData;
    }

    function reset_data_validation() {
        $this->data_validation = new PHPExcel_Cell_DataValidation();
    }

    function set_excel($excel_obj) {
        $this->excel = $excel_obj;
    }

    function get_excel() {
        return $this->excel;
    }

    function getPath() {
        return $this->pathFile;
    }

    public function setPath($filename) {
        return $this->pathFile = $filename;
    }

    function get_template() {
        return $this->template;
    }

    function create_file($filename = null, $lastfix) {
        if (empty($filename)) {
            $filename = date('H-i-s-d-m-Y') . '.xlsx';
        }
        
        $objWriter = \PHPExcel_IOFactory::createWriter($this->excel, 'Excel2007');
        $objWriter->setPreCalculateFormulas(FALSE);
        $objWriter->save($this->pathFile . $lastfix . '/' . $filename);

        return $filename;
    }

    //Draw template
    function create_sheet($name = 'Worksheet', $index = null, $active_sheet = true) {
        $this->excel->createSheet($index);
        if ($index == null) {
            $index = count($this->excel->getAllSheets()) - 1;
            $this->excel->getSheet($index)->setTitle($name);
        } else {
            $this->excel->getSheet($index)->setTitle($name);
        }
        if ($active_sheet) {
            $this->excel->setActiveSheetIndex($index);
        }
        return;
    }

    public function set_array_data($data, $sheetActive, $startCell) {
        if (!empty($data)) {
            $this->excel->setActiveSheetIndex($sheetActive);
            $this->excel->getActiveSheet()->fromArray($data, null, $startCell);
        }
    }

    public function remove_sheet($sheetIndex) {
        $this->excel->removeSheetByIndex($sheetIndex);
        return true;
    }

    public function set_data_validation($cell, $sheet, $column, $min_cell, $max_cell) {
        $this->excel->getActiveSheet()->setDataValidation($cell, $this->data_validation->setType(\PHPExcel_Cell_DataValidation::TYPE_LIST));
        $this->excel->getActiveSheet()->setDataValidation($cell, $this->data_validation->setFormula1($sheet . '!$' . $column . '$' . $min_cell . ':$' . $column . '$' . $max_cell));
        $this->excel->getActiveSheet()->setDataValidation($cell, $this->data_validation->setAllowBlank(true));
        $this->excel->getActiveSheet()->setDataValidation($cell, $this->data_validation->setShowDropDown(true));
        //$this->excel->getActiveSheet()->setDataValidation($cell, $this->data_validation->setShowErrorMessage(true));
    }

    public function set_lock($column_start, $row_start, $column_end, $row_end) {
        $this->excel->getActiveSheet()->getStyle($column_start . $row_start . ':' . $column_end . $row_end)->getProtection()->setLocked(\PHPExcel_Style_Protection::PROTECTION_UNPROTECTED);
        //$this->excel->getActiveSheet()->getStyleByColumnAndRow($col, $row)->getProtection()->setLocked(PHPExcel_Style_Protection::PROTECTION_PROTECTED);
    }

    public function set_lock1($column_start, $row_start, $column_end, $row_end) {
        $this->excel->getActiveSheet()->getStyle($column_start . 1 . ':' . $column_end . 1)->getProtection()->setLocked(\PHPExcel_Style_Protection::PROTECTION_PROTECTED);
    }

    public function set_lock_all() {
        $this->excel->getActiveSheet()->getProtection()->setSheet(true);
        $this->excel->getActiveSheet()->getProtection()->setPassword('PerseedAdmin');
    }

    public function set_active_sheet($index) {
        $this->excel->setActiveSheetIndex($index);
    }

    public function set_hidden_sheet() {
        $this->excel->getActiveSheet()->setSheetState(\PHPExcel_Worksheet::SHEETSTATE_HIDDEN);
    }

    public function set_hidden_row($row) {
        $this->excel->getActiveSheet()->getRowDimension($row)->setVisible(false);
    }

    public function set_hidden_column($column) {
        $this->excel->getActiveSheet()->getColumnDimension($column)->setVisible(false);
    }

    public function set_style_width_column($column) {
        $this->excel->getActiveSheet()->getColumnDimension($column)->setAutoSize(true);
    }

    public function set_format_date($column, $row) {
        $this->excel->getActiveSheet()->getStyle($column . $row)->getNumberFormat()->setFormatCode('dd/mm/yyyy');
    }

    public function set_general_format($column) {
        $this->excel->getActiveSheet()->getStyle($column)->getNumberFormat()->setFormatCode(\PHPExcel_Style_NumberFormat::FORMAT_TEXT);
        $this->excel->getActiveSheet()->getStyle($column . '4')->getNumberFormat()->setFormatCode(\PHPExcel_Style_NumberFormat::FORMAT_TEXT);
    }

    public function set_style_label($column) {
        $this->excel->getActiveSheet()->getStyle($column . '1')->getFont()->setBold(true);
    }

    public function set_style_type($column) {
        $this->excel->getActiveSheet()->getStyle($column . '2')->getFont()->setItalic(true);
    }

    function set_style_label_background($column) {
        $this->excel->getActiveSheet()->getStyle($column . '1')->getFill()->applyFromArray(array('type' => \PHPExcel_Style_Fill::FILL_SOLID, 'startcolor' => array('rgb' => 'C6E2FF')));
    }

    public function set_style_type_background($column) {
        $this->excel->getActiveSheet()->getStyle($column . '2')->getFill()->applyFromArray(array('type' => \PHPExcel_Style_Fill::FILL_SOLID, 'startcolor' => array('rgb' => 'E6E6FA')));
    }

    public function get_cell_data() {
        $this->excel->getActiveSheet()->getCell('A3')->getValue();
    }

    public function get_library_column() {
        $array1 = array();
        $array2 = array();
        $array3 = array();
        $array4 = array();
        foreach (range('A', 'Z') as $letter1) {
            array_push($array1, $letter1);
            foreach (range('A', 'Z') as $letter2) {
                array_push($array2, $letter1 . $letter2);
                foreach (range('A', 'Z') as $letter3) {
                    array_push($array3, $letter1 . $letter2 . $letter3);
                }
            }
        }
        foreach ($array2 as $array2) {
            array_push($array1, $array2);
        }
        foreach ($array3 as $array3) {
            array_push($array1, $array3);
        }
        for ($i = 16384; $i < 18278; $i++) {
            array_push($array4, $i);
        }
        $array5 = array_fill_keys($array4, "");
        $array6 = array_diff_key($array1, $array5);
        return $array6;
    }

    public function getCellValues($force = false) {
        if (!is_null($this->cellValues) && $force === false) {
            return $this->cellValues;
        }
        $currentIndex = $this->excel->getActiveSheetIndex();
        $this->excel->setActiveSheetIndex(0);


        $sheet = $this->excel->getActiveSheet();
        $highestColumn = $sheet->getHighestColumn(); //e.g., 'G'
        $highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn); //e.g., 6
        $highestRow = $sheet->getHighestRow();

        $this->cellValues = array();
        for ($i = 0; $i < $highestColumnIndex; $i++) {
            $column = PHPExcel_Cell::stringFromColumnIndex($i);
            for ($j = 1; $j <= $highestRow; $j++) {
                $this->cellValues[$column . $j] = $sheet->getCellByColumnAndRow($i, $j)->getValue();
            }
        }
        $this->excel->setActiveSheetIndex($currentIndex);
        return $this->cellValues;
    }

    /**
     * returns cell by value. Be carefull, could be ambigous, only use
     * if you really know what you are doing
     */
    public function getCellByValue($search) {
        $nonPrintableChars = array("\n", "\r", "\t", "\s");
        $search = str_replace($nonPrintableChars, '', $search);
        foreach ($this->getCellValues() as $cell => $value) {
            if (strcasecmp(str_replace($nonPrintableChars, '', $value), $search) == 0) {
                return $cell;
            }
        }
        return false;
    }

    public function sortArray($array) {
        if (!empty($array)) {
            $multiArray = $array;
            $array_patient = array();
            foreach ($multiArray as $key => $value) {
                if (strtolower(preg_replace('/\s/', '', $value[2])) == "patient" && strtolower(preg_replace('/\s/', '', $value[3])) == "patient") {
                    array_push($array_patient, $value);
                }
            }
            $tmp = Array();
            $array_container = array();
            foreach ($multiArray as &$ma)
                $tmp[] = &$ma[3];
            array_multisort($tmp, $multiArray);

            foreach ($tmp as $key => $value) {
                if (strtolower(preg_replace('/\s/', '', $value)) == "patient") {
                    array_push($array_container, $key);
                }
            }
            if (!empty($array_container)) {
                return array_merge(array_intersect_key($multiArray, array_flip($array_container)), array_values(array_diff_key($multiArray, array_flip($array_container))));
            } else {
                return $multiArray;
            }
        } else {
            return false;
        }
    }

}
