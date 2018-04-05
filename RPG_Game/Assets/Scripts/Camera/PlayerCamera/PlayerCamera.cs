using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerCamera : MonoBehaviour {

    public LayerMask camCollision;

    private Transform playerTransform;
    private Vector3 playerHeight;

    private float xRot;
    private float yRot;
    private float xCamSpeed;
    private float yCamSpeed;
    private float yLimitMin;
    private float yLimitMax;
    private float camDistance;

    void Start()
    {
        playerTransform = GameObject.Find("Player").GetComponent<Transform>();
        playerHeight = new Vector3(0, GlobalInfo.Instance().get_player_height(), 0);

        xRot = playerTransform.rotation.eulerAngles.x;
        yRot = playerTransform.rotation.eulerAngles.y;
        yLimitMin = -50.0f;
        yLimitMax = 0.0f;

    }

    void LateUpdate()
    {
        if (!GlobalInfo.Instance().is_in_world() && !GlobalInfo.Instance().is_in_zone()) return;

        // Settings
        xCamSpeed = CameraSettings.Instance().xCamSpeed;
        yCamSpeed = CameraSettings.Instance().yCamSpeed;
        camDistance = CameraSettings.Instance().camDistance;

        // Free Movement
        var mouseX = Input.GetAxis("Mouse X");
        var mouseY = Input.GetAxis("Mouse Y");

        xRot += mouseX * xCamSpeed;
        yRot += mouseY * yCamSpeed;

        yRot = Mathf.Clamp(yRot, yLimitMin, yLimitMax);

        Quaternion rotation = Quaternion.Euler(-yRot, xRot, 0);
        Vector3 position = (playerTransform.position + playerHeight) - rotation * Vector3.forward * camDistance;

        Vector3 finalPosition = position + 0.09f * ((playerTransform.position + playerHeight) - position);
        Quaternion finalRotation = rotation;

        RaycastHit hitInfo;
        if (Physics.Linecast(playerTransform.position, position, out hitInfo, camCollision))
        {
            finalPosition = hitInfo.point + 0.1f * ((playerTransform.position + playerHeight) - finalPosition);
        }

        transform.position = finalPosition;
        transform.rotation = Quaternion.LookRotation(((playerTransform.position + playerHeight) - finalPosition), Vector3.up);

    }

}
