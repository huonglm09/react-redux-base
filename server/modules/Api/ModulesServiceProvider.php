<?php

namespace Api;

/**
 * ServiceProvider
 * @package Modules
 */
class ModulesServiceProvider extends \Illuminate\Support\ServiceProvider {

    /**
     * Will make sure that the required modules have been fully loaded
     * @return void
     */
    public function boot() {
        // Load the routes for each of the modules
        if (file_exists(__DIR__ . '/routes.php')) {
            include __DIR__ . '/routes.php';
        }

        // Load the views
        if (is_dir(__DIR__ . '/Views')) {
            $this->loadViewsFrom(__DIR__ . '/Views', 'Api');
        }
    }

    public function register() {
        
    }

}
