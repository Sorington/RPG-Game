using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement_World : MonoBehaviour {

    private CharacterController controller;
    private Animator anim;
    private Transform cameraTransform;
    private Transform cameraY;

    private Vector3 moveDirection;
    private Quaternion playerRotation;

    private float gravity;
    private float movementSpeed;

    private float turnSmoothing = 15.0f;

    void Start()
    {
        controller = GetComponent<CharacterController>();
        anim = GetComponent<Animator>();

        cameraTransform = GameObject.Find("PlayerCamera").GetComponent<Transform>();
        cameraY = GameObject.Find("YCameraRotation").GetComponent<Transform>();

        moveDirection = Vector3.zero;
        playerRotation = transform.rotation;

        gravity = 6.0f;
    }

    void Update()
    {
        if (!GlobalInfo.Instance().is_in_world() && !GlobalInfo.Instance().is_in_zone()) return;

        // Settings
        movementSpeed = GlobalInfo.Instance().get_movspeed_world();

        // Input
        float vertical = Input.GetAxis("Vertical");
        float horizontal = Input.GetAxis("Horizontal");

        
        // Movement
        if (vertical != 0 || horizontal != 0)
        {
            anim.SetBool("Running", true);
            float aux = moveDirection.y;
            moveDirection = new Vector3(horizontal, 0, vertical).normalized;
            moveDirection = cameraY.TransformDirection(moveDirection);
            moveDirection *= movementSpeed*Time.deltaTime;
            moveDirection.y = aux;

            // Rotation
            Rotating(moveDirection.x, moveDirection.z);
            /*
            playerRotation = Quaternion.LookRotation(Vector3(moveDirection.x, 0, moveDirection.z).normalized, Vector3.up);
            transform.rotation = Quaternion.Slerp(transform.rotation, playerRotation, 0.5);*/
        	}
            else
            {
                anim.SetBool("Running", false);/*
                if (moveDirection.x != 0 || moveDirection.z != 0)
                {
                    playerRotation = Quaternion.LookRotation(Vector3(moveDirection.x, 0, moveDirection.z).normalized, Vector3.up);
                    playerRotation.eulerAngles.y+=135.0f;
                    if (playerRotation.eulerAngles.y >= 360.0f) playerRotation.eulerAngles.y -= 360.0f;
                    transform.rotation = Quaternion.Slerp(transform.rotation, playerRotation, 0.5);
                }*/
        		moveDirection.x = 0;
                moveDirection.z = 0;
            }

            // Gravity
            moveDirection.y -= gravity*Time.deltaTime;

            controller.Move(moveDirection);
            
    }

    void Rotating(float horizontal, float vertical)
    {
        Vector3 targetDirection = new Vector3(horizontal, 0f, vertical);
        Quaternion targetRotation = Quaternion.LookRotation(targetDirection, Vector3.up);
        Quaternion newRotation = Quaternion.Lerp(transform.rotation, targetRotation, turnSmoothing * Time.deltaTime);
        transform.rotation = newRotation;
    }

}
