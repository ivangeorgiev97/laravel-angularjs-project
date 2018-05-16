<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Http\Requests\SendEmailRequest;
use App\Services\ContactService;

class ContactController extends Controller {
    
    private $contactService;
    
    public function __construct(ContactService $contactService) {
        $this->contactService = $contactService;
    }

    public function sendEmail(SendEmailRequest $request) {
        $validated = $request->validated();
        
        $data = array(
            'email' => $validated['email'],
            'subject' => $validated['subject'],
            'bodyMessage' => $validated['message']
        );

        return response()->json($this->contactService->sendEmail($data));
    }

}
